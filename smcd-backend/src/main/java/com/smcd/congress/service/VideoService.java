package com.smcd.congress.service;

import com.smcd.congress.dto.VideoDTO;
import com.smcd.congress.dto.VideoResponseDTO;
import com.smcd.congress.dto.VideoStatsDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Chapter;
import com.smcd.congress.model.Video;
import com.smcd.congress.model.enums.VisibiliteVideo;
import com.smcd.congress.repository.ChapterRepository;
import com.smcd.congress.repository.RoomRepository;
import com.smcd.congress.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Service pour la gestion des Vidéos
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final ChapterRepository chapterRepository;
    private final RoomRepository roomRepository;
    private final CloudinaryService cloudinaryService;

    // Formats vidéo autorisés
    private static final Set<String> ALLOWED_VIDEO_FORMATS = Set.of(
            "video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv",
            "video/webm", "video/mpeg"
    );

    // Taille max : 500 MB
    private static final long MAX_VIDEO_SIZE = 500L * 1024 * 1024;

    /**
     * Génère un slug à partir d'un texte
     */
    private String generateSlug(String text) {
        if (text == null) return "";
        
        String normalized = Normalizer.normalize(text.toLowerCase(), Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("");
        slug = slug.replaceAll("[^a-z0-9]", "-");
        slug = slug.replaceAll("-+", "-").replaceAll("^-|-$", "");
        
        return slug;
    }

    /**
     * Génère un slug unique
     */
    private String generateUniqueSlug(String text) {
        String baseSlug = generateSlug(text);
        String slug = baseSlug;
        int counter = 1;
        
        while (videoRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        
        return slug;
    }

    /**
     * Valide le format d'un fichier vidéo
     */
    private void validateVideoFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier vidéo est obligatoire");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_VIDEO_FORMATS.contains(contentType)) {
            throw new IllegalArgumentException("Format vidéo non supporté. Formats acceptés : MP4, MOV, AVI, WMV, WebM, MPEG");
        }

        if (file.getSize() > MAX_VIDEO_SIZE) {
            throw new IllegalArgumentException("La taille du fichier dépasse la limite de 500 MB");
        }
    }

    /**
     * Détermine le format à partir du content type
     */
    private String getFormatFromContentType(String contentType) {
        if (contentType == null) return "UNKNOWN";
        return switch (contentType) {
            case "video/mp4" -> "MP4";
            case "video/quicktime" -> "MOV";
            case "video/x-msvideo" -> "AVI";
            case "video/x-ms-wmv" -> "WMV";
            case "video/webm" -> "WebM";
            case "video/mpeg" -> "MPEG";
            default -> "UNKNOWN";
        };
    }

    /**
     * Upload une nouvelle vidéo
     */
    @Transactional
    public Video uploadVideo(MultipartFile videoFile, MultipartFile thumbnail, VideoDTO dto) {
        // Validation
        validateVideoFile(videoFile);

        Chapter chapter = chapterRepository.findById(dto.getChapterId())
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec l'ID : " + dto.getChapterId()));

        log.info("Upload d'une nouvelle vidéo dans le chapitre {} : {}", chapter.getTitre(), dto.getTitre());

        Video video = Video.builder()
                .titre(dto.getTitre())
                .slug(generateUniqueSlug(dto.getTitre()))
                .description(dto.getDescription())
                .descriptionCourte(dto.getDescriptionCourte())
                .intervenant(dto.getIntervenant())
                .coIntervenants(dto.getCoIntervenants())
                .tags(dto.getTags())
                .langue(dto.getLangue() != null ? dto.getLangue() : "FR")
                .visibilite(dto.getVisibilite() != null ? dto.getVisibilite() : VisibiliteVideo.PUBLIC)
                .publie(false) // Brouillon par défaut
                .chapter(chapter)
                .format(getFormatFromContentType(videoFile.getContentType()))
                .tailleFichier(videoFile.getSize())
                .build();

        // Déterminer l'ordre dans le chapitre
        Integer maxOrdre = videoRepository.findMaxOrdreByChapterId(chapter.getId());
        video.setOrdre(maxOrdre + 1);

        // Upload vidéo vers Cloudinary
        try {
            String annee = chapter.getRoom() != null ? String.valueOf(chapter.getRoom().getAnnee()) : "2026";
            Map<String, String> videoResult = cloudinaryService.uploadVideo(
                    videoFile,
                    "videos/" + annee
            );
            video.setVideoUrl(videoResult.get("url"));
            video.setVideoPublicId(videoResult.get("publicId"));
            
            // Extraire la durée si disponible
            if (videoResult.containsKey("duration")) {
                try {
                    video.setDuree(Integer.parseInt(videoResult.get("duration")));
                } catch (NumberFormatException e) {
                    log.warn("Impossible de parser la durée de la vidéo");
                }
            }
            
            log.info("Vidéo uploadée : {}", videoResult.get("url"));
        } catch (Exception e) {
            log.error("Erreur lors de l'upload de la vidéo", e);
            throw new RuntimeException("Erreur lors de l'upload de la vidéo : " + e.getMessage());
        }

        // Upload thumbnail si fourni
        if (thumbnail != null && !thumbnail.isEmpty()) {
            try {
                String annee = chapter.getRoom() != null ? String.valueOf(chapter.getRoom().getAnnee()) : "2026";
                Map<String, String> thumbResult = cloudinaryService.uploadFile(
                        thumbnail,
                        "videos/" + annee + "/thumbnails"
                );
                video.setThumbnailUrl(thumbResult.get("url"));
                video.setThumbnailPublicId(thumbResult.get("publicId"));
                log.info("Thumbnail uploadé : {}", thumbResult.get("url"));
            } catch (Exception e) {
                log.error("Erreur lors de l'upload du thumbnail", e);
            }
        }

        Video savedVideo = videoRepository.save(video);
        log.info("Vidéo créée avec l'ID : {}", savedVideo.getId());
        
        return savedVideo;
    }

    /**
     * Modifie une vidéo existante
     */
    @Transactional
    public Video modifierVideo(Long id, VideoDTO dto, MultipartFile newThumbnail) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec l'ID : " + id));

        log.info("Modification de la vidéo ID {} : {}", id, dto.getTitre());

        video.setTitre(dto.getTitre());
        video.setDescription(dto.getDescription());
        video.setDescriptionCourte(dto.getDescriptionCourte());
        video.setIntervenant(dto.getIntervenant());
        video.setCoIntervenants(dto.getCoIntervenants());
        video.setTags(dto.getTags());
        if (dto.getLangue() != null) video.setLangue(dto.getLangue());
        if (dto.getVisibilite() != null) video.setVisibilite(dto.getVisibilite());

        // Upload nouveau thumbnail si fourni
        if (newThumbnail != null && !newThumbnail.isEmpty()) {
            try {
                // Supprimer l'ancien thumbnail
                if (video.getThumbnailPublicId() != null) {
                    cloudinaryService.deleteFile(video.getThumbnailPublicId());
                }

                String annee = video.getChapter().getRoom() != null 
                        ? String.valueOf(video.getChapter().getRoom().getAnnee()) : "2026";
                Map<String, String> thumbResult = cloudinaryService.uploadFile(
                        newThumbnail,
                        "videos/" + annee + "/thumbnails"
                );
                video.setThumbnailUrl(thumbResult.get("url"));
                video.setThumbnailPublicId(thumbResult.get("publicId"));
                log.info("Nouveau thumbnail uploadé : {}", thumbResult.get("url"));
            } catch (Exception e) {
                log.error("Erreur lors de l'upload du nouveau thumbnail", e);
            }
        }

        return videoRepository.save(video);
    }

    /**
     * Publie une vidéo
     */
    @Transactional
    public Video publierVideo(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec l'ID : " + id));

        log.info("Publication de la vidéo ID {} : {}", id, video.getTitre());
        video.publier();
        
        return videoRepository.save(video);
    }

    /**
     * Dépublie une vidéo
     */
    @Transactional
    public Video depublierVideo(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec l'ID : " + id));

        log.info("Dépublication de la vidéo ID {} : {}", id, video.getTitre());
        video.depublier();
        
        return videoRepository.save(video);
    }

    /**
     * Supprime une vidéo
     */
    @Transactional
    public void supprimerVideo(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec l'ID : " + id));

        log.info("Suppression de la vidéo ID {} : {}", id, video.getTitre());

        // Supprimer la vidéo de Cloudinary
        if (video.getVideoPublicId() != null) {
            try {
                cloudinaryService.deleteVideo(video.getVideoPublicId());
            } catch (Exception e) {
                log.error("Erreur lors de la suppression de la vidéo sur Cloudinary", e);
            }
        }

        // Supprimer le thumbnail de Cloudinary
        if (video.getThumbnailPublicId() != null) {
            try {
                cloudinaryService.deleteFile(video.getThumbnailPublicId());
            } catch (Exception e) {
                log.error("Erreur lors de la suppression du thumbnail", e);
            }
        }

        videoRepository.delete(video);
    }

    /**
     * Incrémente le compteur de vues
     */
    @Transactional
    public void incrementerVues(Long id) {
        videoRepository.incrementerVues(id);
        log.debug("Vue incrémentée pour la vidéo ID {}", id);
    }

    /**
     * Récupère les vidéos d'un chapitre (par slug)
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosByChapter(String chapterSlug) {
        Chapter chapter = chapterRepository.findBySlug(chapterSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec le slug : " + chapterSlug));
        return getVideosByChapter(chapter.getId(), true);
    }

    /**
     * Récupère les vidéos d'un chapitre par ID
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosParChapitreId(Long chapterId) {
        return getVideosByChapter(chapterId, false);
    }

    /**
     * Récupère les vidéos d'un chapitre (publiées uniquement pour le public)
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosByChapter(Long chapterId, boolean onlyPublished) {
        List<Video> videos;
        if (onlyPublished) {
            videos = videoRepository.findByChapterIdAndPublieTrueOrderByOrdreAsc(chapterId);
        } else {
            videos = videoRepository.findByChapterIdOrderByOrdreAsc(chapterId);
        }
        return videos.stream()
                .map(VideoResponseDTO::fromVideo)
                .toList();
    }

    /**
     * Récupère les vidéos publiées par visibilité
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosPubliques(VisibiliteVideo visibilite) {
        List<Video> videos;
        if (visibilite != null) {
            videos = videoRepository.findByPublieTrueAndVisibiliteOrderByDatePublicationDesc(visibilite);
        } else {
            videos = videoRepository.findByPublieTrueOrderByDatePublicationDesc();
        }
        return videos.stream()
                .map(VideoResponseDTO::fromVideo)
                .toList();
    }

    /**
     * Récupère les vidéos les plus vues
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosLesPlusVues(int limit) {
        List<Video> videos = videoRepository.findTopVideos(PageRequest.of(0, limit));
        return videos.stream()
                .map(VideoResponseDTO::fromVideo)
                .toList();
    }

    /**
     * Récupère les vidéos récentes
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> getVideosRecentes(int limit) {
        List<Video> videos = videoRepository.findRecentVideos(PageRequest.of(0, limit));
        return videos.stream()
                .map(VideoResponseDTO::fromVideo)
                .toList();
    }

    /**
     * Recherche de vidéos
     */
    @Transactional(readOnly = true)
    public List<VideoResponseDTO> chercherVideos(String query) {
        List<Video> videos = videoRepository.searchVideos(query);
        return videos.stream()
                .map(VideoResponseDTO::fromVideo)
                .toList();
    }

    /**
     * Récupère une vidéo par son slug
     */
    @Transactional(readOnly = true)
    public VideoResponseDTO getVideoBySlug(String slug) {
        Video video = videoRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec le slug : " + slug));
        return VideoResponseDTO.fromVideo(video);
    }

    /**
     * Récupère une vidéo par son ID
     */
    @Transactional(readOnly = true)
    public VideoResponseDTO getVideoById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vidéo non trouvée avec l'ID : " + id));
        return VideoResponseDTO.fromVideo(video);
    }

    /**
     * Réordonne les vidéos d'un chapitre
     */
    @Transactional
    public void reordonnerVideos(Long chapterId, List<Long> idsOrdre) {
        log.info("Réordonnancement des vidéos du chapitre {} : {}", chapterId, idsOrdre);
        
        for (int i = 0; i < idsOrdre.size(); i++) {
            Long videoId = idsOrdre.get(i);
            final int ordre = i + 1;
            videoRepository.findById(videoId).ifPresent(video -> {
                video.setOrdre(ordre);
                videoRepository.save(video);
            });
        }
    }

    /**
     * Récupère les statistiques globales
     */
    @Transactional(readOnly = true)
    public VideoStatsDTO getStatistiques() {
        Long totalSalles = roomRepository.count();
        Long totalChapitres = chapterRepository.count();
        Long totalVideos = videoRepository.count();
        Long videosPubliees = videoRepository.countByPublieTrue();
        Long videosBrouillon = videoRepository.countByPublieFalse();
        Long totalVues = videoRepository.getTotalVues();
        Long totalDureeSecondes = videoRepository.getTotalDureeSecondes();
        Long totalTaille = videoRepository.getTotalTailleFichier();

        // Durée totale formatée
        String dureeTotale = "0h 00min";
        if (totalDureeSecondes != null && totalDureeSecondes > 0) {
            long heures = totalDureeSecondes / 3600;
            long minutes = (totalDureeSecondes % 3600) / 60;
            dureeTotale = String.format("%dh %02dmin", heures, minutes);
        }

        // Espace disque formaté
        String espaceDisk = "0 MB";
        if (totalTaille != null && totalTaille > 0) {
            double sizeGB = totalTaille / (1024.0 * 1024.0 * 1024.0);
            if (sizeGB >= 1) {
                espaceDisk = String.format("%.1f GB", sizeGB);
            } else {
                double sizeMB = totalTaille / (1024.0 * 1024.0);
                espaceDisk = String.format("%.1f MB", sizeMB);
            }
        }

        // Vidéos par langue
        Map<String, Long> videosParLangue = new HashMap<>();
        videoRepository.countByLangue().forEach(row -> {
            videosParLangue.put((String) row[0], (Long) row[1]);
        });

        // Vidéos par visibilité
        Map<String, Long> videosParVisibilite = new HashMap<>();
        videoRepository.countByVisibilite().forEach(row -> {
            VisibiliteVideo vis = (VisibiliteVideo) row[0];
            videosParVisibilite.put(vis.name(), (Long) row[1]);
        });

        // Top vidéos
        List<VideoResponseDTO> topVideos = getVideosLesPlusVues(10);
        List<VideoResponseDTO> videosRecentes = getVideosRecentes(10);

        return VideoStatsDTO.builder()
                .totalSalles(totalSalles)
                .totalChapitres(totalChapitres)
                .totalVideos(totalVideos)
                .videosPubliees(videosPubliees)
                .videosBrouillon(videosBrouillon)
                .totalVues(totalVues != null ? totalVues : 0L)
                .dureeTotale(dureeTotale)
                .espaceDiskUtilise(espaceDisk)
                .videosParLangue(videosParLangue)
                .videosParVisibilite(videosParVisibilite)
                .topVideos(topVideos)
                .videosRecentes(videosRecentes)
                .build();
    }
}

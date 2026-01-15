package com.smcd.congress.service;

import com.smcd.congress.dto.ChapterDTO;
import com.smcd.congress.dto.ChapterResponseDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Chapter;
import com.smcd.congress.model.Room;
import com.smcd.congress.repository.ChapterRepository;
import com.smcd.congress.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Service pour la gestion des Chapitres
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChapterService {

    private final ChapterRepository chapterRepository;
    private final RoomRepository roomRepository;

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
        
        while (chapterRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        
        return slug;
    }

    /**
     * Crée un nouveau chapitre
     */
    @Transactional
    public Chapter creerChapter(ChapterDTO dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + dto.getRoomId()));

        log.info("Création d'un nouveau chapitre dans la salle {} : {}", room.getNom(), dto.getTitre());

        Chapter chapter = Chapter.builder()
                .titre(dto.getTitre())
                .slug(generateUniqueSlug(dto.getTitre()))
                .description(dto.getDescription())
                .descriptionCourte(dto.getDescriptionCourte())
                .moderateur(dto.getModerateur())
                .dateSession(dto.getDateSession())
                .heureDebut(dto.getHeureDebut())
                .heureFin(dto.getHeureFin())
                .room(room)
                .build();

        // Déterminer l'ordre dans la room
        Integer maxOrdre = chapterRepository.findMaxOrdreByRoomId(room.getId());
        chapter.setOrdre(maxOrdre + 1);

        Chapter savedChapter = chapterRepository.save(chapter);
        log.info("Chapitre créé avec l'ID : {}", savedChapter.getId());
        
        return savedChapter;
    }

    /**
     * Modifie un chapitre existant
     */
    @Transactional
    public Chapter modifierChapter(Long id, ChapterDTO dto) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec l'ID : " + id));

        log.info("Modification du chapitre ID {} : {}", id, dto.getTitre());

        chapter.setTitre(dto.getTitre());
        chapter.setDescription(dto.getDescription());
        chapter.setDescriptionCourte(dto.getDescriptionCourte());
        chapter.setModerateur(dto.getModerateur());
        chapter.setDateSession(dto.getDateSession());
        chapter.setHeureDebut(dto.getHeureDebut());
        chapter.setHeureFin(dto.getHeureFin());

        return chapterRepository.save(chapter);
    }

    /**
     * Déplace un chapitre vers une autre salle
     */
    @Transactional
    public Chapter deplacerChapter(Long chapterId, Long newRoomId) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec l'ID : " + chapterId));

        Room newRoom = roomRepository.findById(newRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + newRoomId));

        log.info("Déplacement du chapitre {} vers la salle {}", chapter.getTitre(), newRoom.getNom());

        // Mettre à jour la room
        chapter.setRoom(newRoom);
        
        // Réajuster l'ordre dans la nouvelle room
        Integer maxOrdre = chapterRepository.findMaxOrdreByRoomId(newRoomId);
        chapter.setOrdre(maxOrdre + 1);

        return chapterRepository.save(chapter);
    }

    /**
     * Supprime un chapitre
     */
    @Transactional
    public void supprimerChapter(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec l'ID : " + id));

        // Vérifier si le chapitre contient des vidéos
        if (chapter.getVideos() != null && !chapter.getVideos().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer un chapitre contenant des vidéos. Supprimez d'abord les vidéos.");
        }

        log.info("Suppression du chapitre ID {} : {}", id, chapter.getTitre());
        chapterRepository.delete(chapter);
    }

    /**
     * Réordonne les chapitres d'une salle
     */
    @Transactional
    public void reordonnerChapters(Long roomId, List<Long> idsOrdre) {
        log.info("Réordonnancement des chapitres de la salle {} : {}", roomId, idsOrdre);
        
        for (int i = 0; i < idsOrdre.size(); i++) {
            Long chapterId = idsOrdre.get(i);
            final int ordre = i + 1;
            chapterRepository.findById(chapterId).ifPresent(chapter -> {
                chapter.setOrdre(ordre);
                chapterRepository.save(chapter);
            });
        }
    }

    /**
     * Récupère les chapitres d'une salle
     */
    @Transactional(readOnly = true)
    public List<ChapterResponseDTO> getChaptersByRoom(Long roomId) {
        List<Chapter> chapters = chapterRepository.findByRoomIdOrderByOrdreAsc(roomId);
        return chapters.stream()
                .map(ChapterResponseDTO::fromChapter)
                .toList();
    }

    /**
     * Récupère les chapitres d'une salle avec les vidéos
     */
    @Transactional(readOnly = true)
    public List<ChapterResponseDTO> getChaptersByRoomWithVideos(Long roomId) {
        List<Chapter> chapters = chapterRepository.findByRoomIdWithVideos(roomId);
        return chapters.stream()
                .map(ChapterResponseDTO::fromChapterWithVideos)
                .toList();
    }

    /**
     * Récupère un chapitre par son slug avec ses vidéos
     */
    @Transactional(readOnly = true)
    public ChapterResponseDTO getChapterBySlug(String slug) {
        Chapter chapter = chapterRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec le slug : " + slug));
        return ChapterResponseDTO.fromChapterWithVideos(chapter);
    }

    /**
     * Récupère un chapitre par son ID
     */
    @Transactional(readOnly = true)
    public ChapterResponseDTO getChapterById(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapitre non trouvé avec l'ID : " + id));
        return ChapterResponseDTO.fromChapter(chapter);
    }

    /**
     * Compte le nombre de chapitres d'une salle
     */
    @Transactional(readOnly = true)
    public Long countChaptersByRoom(Long roomId) {
        return chapterRepository.countByRoomId(roomId);
    }

    /**
     * Compte le nombre total de chapitres
     */
    @Transactional(readOnly = true)
    public Long countAllChapters() {
        return chapterRepository.count();
    }
}

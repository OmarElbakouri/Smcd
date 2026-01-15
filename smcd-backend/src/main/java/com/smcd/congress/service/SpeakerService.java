package com.smcd.congress.service;

import com.smcd.congress.dto.*;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Speaker;
import com.smcd.congress.repository.SpeakerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

/**
 * Service pour la gestion des Speakers (Invités/Conférenciers)
 */
@Service
@Transactional
public class SpeakerService {

    private static final Logger logger = LoggerFactory.getLogger(SpeakerService.class);

    // Types de fichiers autorisés pour les photos
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/webp"
    );

    // Types de fichiers autorisés pour les CV
    private static final List<String> ALLOWED_CV_TYPES = Arrays.asList(
            "application/pdf"
    );

    // Taille maximale : 10 MB pour les photos, 20 MB pour les CV
    private static final long MAX_PHOTO_SIZE = 10 * 1024 * 1024;
    private static final long MAX_CV_SIZE = 20 * 1024 * 1024;

    @Autowired
    private SpeakerRepository speakerRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    /**
     * Crée un nouveau Speaker
     */
    public Speaker creerSpeaker(SpeakerDTO dto, MultipartFile photo, MultipartFile cv) throws IOException {
        // Valider et uploader la photo (obligatoire)
        if (photo == null || photo.isEmpty()) {
            throw new IllegalArgumentException("La photo est obligatoire");
        }
        validatePhoto(photo);
        Map<String, String> photoResult = cloudinaryService.uploadFile(photo, "speakers/photos");
        String photoUrl = photoResult.get("url");
        String photoPublicId = photoResult.get("publicId");

        // Uploader le CV (optionnel)
        String cvUrl = null;
        String cvPublicId = null;
        if (cv != null && !cv.isEmpty()) {
            validateCV(cv);
            Map<String, String> cvResult = cloudinaryService.uploadFile(cv, "speakers/cv");
            cvUrl = cvResult.get("url");
            cvPublicId = cvResult.get("publicId");
        }

        // Déterminer l'ordre automatiquement
        Integer annee = dto.getAnnee() != null ? dto.getAnnee() : 2026;
        Integer maxOrdre = speakerRepository.findMaxOrdreByAnnee(annee);
        Integer ordre = (maxOrdre != null ? maxOrdre : 0) + 1;

        // Créer l'entité
        Speaker speaker = Speaker.builder()
                .titre(dto.getTitre())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .specialite(dto.getSpecialite())
                .institution(dto.getInstitution())
                .pays(dto.getPays())
                .ville(dto.getVille())
                .bioCourteFr(dto.getBioCourteFr())
                .bioCompleteFr(dto.getBioCompleteFr())
                .bioCourteEn(dto.getBioCourteEn())
                .bioCompleteEn(dto.getBioCompleteEn())
                .photoUrl(photoUrl)
                .photoPublicId(photoPublicId)
                .cvUrl(cvUrl)
                .cvPublicId(cvPublicId)
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .siteWeb(dto.getSiteWeb())
                .linkedinUrl(dto.getLinkedinUrl())
                .researchGateUrl(dto.getResearchGateUrl())
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .annee(annee)
                .ordre(ordre)
                .build();

        speaker = speakerRepository.save(speaker);
        logger.info("Speaker créé avec succès: ID={}, Nom={}", speaker.getId(), speaker.getNomComplet());

        return speaker;
    }

    /**
     * Modifie un Speaker existant
     */
    public Speaker modifierSpeaker(Long id, SpeakerDTO dto, MultipartFile newPhoto, MultipartFile newCv) throws IOException {
        Speaker speaker = getSpeakerById(id);

        // Mise à jour de la photo si fournie
        if (newPhoto != null && !newPhoto.isEmpty()) {
            validatePhoto(newPhoto);
            
            // Supprimer l'ancienne photo
            if (speaker.getPhotoPublicId() != null) {
                try {
                    cloudinaryService.deleteFile(speaker.getPhotoPublicId());
                } catch (Exception e) {
                    logger.error("Erreur lors de la suppression de l'ancienne photo: {}", e.getMessage());
                }
            }
            
            // Uploader la nouvelle
            Map<String, String> photoResult = cloudinaryService.uploadFile(newPhoto, "speakers/photos");
            speaker.setPhotoUrl(photoResult.get("url"));
            speaker.setPhotoPublicId(photoResult.get("publicId"));
        }

        // Mise à jour du CV si fourni
        if (newCv != null && !newCv.isEmpty()) {
            validateCV(newCv);
            
            // Supprimer l'ancien CV
            if (speaker.getCvPublicId() != null) {
                try {
                    cloudinaryService.deleteFile(speaker.getCvPublicId());
                } catch (Exception e) {
                    logger.error("Erreur lors de la suppression de l'ancien CV: {}", e.getMessage());
                }
            }
            
            // Uploader le nouveau
            Map<String, String> cvResult = cloudinaryService.uploadFile(newCv, "speakers/cv");
            speaker.setCvUrl(cvResult.get("url"));
            speaker.setCvPublicId(cvResult.get("publicId"));
        }

        // Mise à jour des autres champs
        if (dto.getTitre() != null) speaker.setTitre(dto.getTitre());
        if (dto.getNom() != null) speaker.setNom(dto.getNom());
        if (dto.getPrenom() != null) speaker.setPrenom(dto.getPrenom());
        if (dto.getSpecialite() != null) speaker.setSpecialite(dto.getSpecialite());
        if (dto.getInstitution() != null) speaker.setInstitution(dto.getInstitution());
        if (dto.getPays() != null) speaker.setPays(dto.getPays());
        if (dto.getVille() != null) speaker.setVille(dto.getVille());
        if (dto.getBioCourteFr() != null) speaker.setBioCourteFr(dto.getBioCourteFr());
        if (dto.getBioCompleteFr() != null) speaker.setBioCompleteFr(dto.getBioCompleteFr());
        if (dto.getBioCourteEn() != null) speaker.setBioCourteEn(dto.getBioCourteEn());
        if (dto.getBioCompleteEn() != null) speaker.setBioCompleteEn(dto.getBioCompleteEn());
        if (dto.getEmail() != null) speaker.setEmail(dto.getEmail());
        if (dto.getTelephone() != null) speaker.setTelephone(dto.getTelephone());
        if (dto.getSiteWeb() != null) speaker.setSiteWeb(dto.getSiteWeb());
        if (dto.getLinkedinUrl() != null) speaker.setLinkedinUrl(dto.getLinkedinUrl());
        if (dto.getResearchGateUrl() != null) speaker.setResearchGateUrl(dto.getResearchGateUrl());
        if (dto.getFeatured() != null) speaker.setFeatured(dto.getFeatured());

        speaker = speakerRepository.save(speaker);
        logger.info("Speaker modifié avec succès: ID={}", id);

        return speaker;
    }

    /**
     * Supprime un Speaker et ses fichiers Cloudinary
     */
    public void supprimerSpeaker(Long id) {
        Speaker speaker = getSpeakerById(id);
        
        // Supprimer la photo de Cloudinary
        if (speaker.getPhotoPublicId() != null) {
            try {
                cloudinaryService.deleteFile(speaker.getPhotoPublicId());
            } catch (Exception e) {
                logger.error("Erreur lors de la suppression de la photo: {}", e.getMessage());
            }
        }
        
        // Supprimer le CV de Cloudinary
        if (speaker.getCvPublicId() != null) {
            try {
                cloudinaryService.deleteFile(speaker.getCvPublicId());
            } catch (Exception e) {
                logger.error("Erreur lors de la suppression du CV: {}", e.getMessage());
            }
        }
        
        speakerRepository.delete(speaker);
        logger.info("Speaker supprimé: ID={}", id);
    }

    /**
     * Réorganise l'ordre des speakers
     */
    public void reordonnerSpeakers(List<Long> idsOrdre) {
        for (int i = 0; i < idsOrdre.size(); i++) {
            Long id = idsOrdre.get(i);
            speakerRepository.findById(id).ifPresent(speaker -> {
                speaker.setOrdre(idsOrdre.indexOf(id) + 1);
                speakerRepository.save(speaker);
            });
        }
        logger.info("Speakers réorganisés: {} éléments", idsOrdre.size());
    }

    /**
     * Récupère les speakers publics
     */
    @Transactional(readOnly = true)
    public List<SpeakerPublicResponseDTO> getSpeakersPublics(Integer annee, Boolean featured) {
        List<Speaker> speakers;
        
        if (featured != null && featured) {
            speakers = speakerRepository.findByFeaturedTrueAndAnneeOrderByOrdreAsc(annee != null ? annee : 2026);
        } else if (annee != null) {
            speakers = speakerRepository.findByAnneeOrderByOrdreAsc(annee);
        } else {
            speakers = speakerRepository.findByAnneeOrderByOrdreAsc(2026);
        }

        return speakers.stream()
                .map(SpeakerPublicResponseDTO::fromEntity)
                .toList();
    }

    /**
     * Récupère tous les speakers (admin)
     */
    @Transactional(readOnly = true)
    public List<SpeakerAdminResponseDTO> getSpeakersAdmin(Integer annee, String pays, String specialite) {
        List<Speaker> speakers = speakerRepository.findWithFilters(annee, pays, specialite, null);

        return speakers.stream()
                .map(SpeakerAdminResponseDTO::fromEntity)
                .toList();
    }

    /**
     * Récupère un Speaker par ID
     */
    @Transactional(readOnly = true)
    public Speaker getSpeakerById(Long id) {
        return speakerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Speaker non trouvé: " + id));
    }

    /**
     * Récupère le Président du congrès
     */
    @Transactional(readOnly = true)
    public java.util.Optional<SpeakerPublicResponseDTO> getPresident(Integer annee) {
        return speakerRepository.findByIsPresidentTrueAndAnnee(annee)
                .map(SpeakerPublicResponseDTO::fromEntity);
    }

    /**
     * Récupère un Speaker public par ID
     */
    @Transactional(readOnly = true)
    public SpeakerPublicResponseDTO getSpeakerPublicById(Long id) {
        Speaker speaker = getSpeakerById(id);
        return SpeakerPublicResponseDTO.fromEntity(speaker);
    }

    /**
     * Récupère les statistiques des speakers
     */
    @Transactional(readOnly = true)
    public SpeakerStatsDTO getStats(Integer annee) {
        Integer targetAnnee = annee != null ? annee : 2026;
        
        Long total = speakerRepository.countByAnnee(targetAnnee);
        Long featured = speakerRepository.countByFeaturedTrueAndAnnee(targetAnnee);

        // Par pays
        Map<String, Long> parPays = new LinkedHashMap<>();
        List<Object[]> paysStats = speakerRepository.countByPaysForAnnee(targetAnnee);
        for (Object[] row : paysStats) {
            String pays = (String) row[0];
            Long count = (Long) row[1];
            if (pays != null) {
                parPays.put(pays, count);
            }
        }

        // Par spécialité
        Map<String, Long> parSpecialite = new LinkedHashMap<>();
        List<Object[]> specStats = speakerRepository.countBySpecialiteForAnnee(targetAnnee);
        for (Object[] row : specStats) {
            String spec = (String) row[0];
            Long count = (Long) row[1];
            if (spec != null) {
                parSpecialite.put(spec, count);
            }
        }

        return SpeakerStatsDTO.builder()
                .total(total)
                .featured(featured)
                .parPays(parPays)
                .parSpecialite(parSpecialite)
                .build();
    }

    /**
     * Récupère les filtres disponibles
     */
    @Transactional(readOnly = true)
    public Map<String, List<String>> getFilterOptions() {
        Map<String, List<String>> options = new HashMap<>();
        options.put("pays", speakerRepository.findDistinctPays());
        options.put("specialites", speakerRepository.findDistinctSpecialites());
        options.put("annees", speakerRepository.findDistinctAnnees().stream().map(String::valueOf).toList());
        return options;
    }

    /**
     * Valide un fichier photo
     */
    private void validatePhoto(MultipartFile photo) {
        if (photo.getSize() > MAX_PHOTO_SIZE) {
            throw new IllegalArgumentException("La photo ne doit pas dépasser 10 MB");
        }
        
        String contentType = photo.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Seuls les fichiers image (JPG, PNG, WebP) sont autorisés pour la photo");
        }
    }

    /**
     * Valide un fichier CV
     */
    private void validateCV(MultipartFile cv) {
        if (cv.getSize() > MAX_CV_SIZE) {
            throw new IllegalArgumentException("Le CV ne doit pas dépasser 20 MB");
        }
        
        String contentType = cv.getContentType();
        if (contentType == null || !ALLOWED_CV_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Seuls les fichiers PDF sont autorisés pour le CV");
        }
    }
}

package com.smcd.congress.service;

import com.smcd.congress.dto.*;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Abstract;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutSoumission;
import com.smcd.congress.model.enums.TypeCommunication;
import com.smcd.congress.repository.AbstractRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service principal pour la gestion des abstracts
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AbstractService {

    private final AbstractRepository abstractRepository;
    private final WordGeneratorService wordGeneratorService;
    private final EmailService emailService;
    private final CloudinaryService cloudinaryService;

    /**
     * Soumet un nouvel abstract
     */
    @Transactional
    public Abstract submitAbstract(AbstractSubmissionDTO dto) {
        log.info("Soumission d'un nouvel abstract par: {} {}", dto.getPrenom(), dto.getNom());

        // Générer le numéro de référence unique
        String numeroReference = generateReferenceNumber();

        // Créer l'entité Abstract
        Abstract abstractEntity = Abstract.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .auteurs(dto.getAuteurs())
                .affiliation(dto.getAffiliation())
                .type(dto.getType())
                .urlVideo(dto.getUrlVideo())
                .rubrique(dto.getRubrique())
                .titre(dto.getTitre())
                .motsCles(dto.getMotsCles())
                .introduction(dto.getIntroduction())
                .materielMethodes(dto.getMaterielMethodes())
                .resultats(dto.getResultats())
                .discussion(dto.getDiscussion())
                .conclusion(dto.getConclusion())
                .references(dto.getReferences())
                .statut(StatutSoumission.EN_ATTENTE)
                .numeroReference(numeroReference)
                .build();

        // Sauvegarder en base
        abstractEntity = abstractRepository.save(abstractEntity);
        log.info("Abstract sauvegardé avec le numéro de référence: {}", numeroReference);

        // Générer le document Word
        try {
            String wordUrl = wordGeneratorService.generateAbstractDocument(abstractEntity);
            abstractEntity.setWordFileUrl(wordUrl);
            abstractEntity = abstractRepository.save(abstractEntity);
            log.info("Document Word généré et sauvegardé: {}", wordUrl);
        } catch (Exception e) {
            log.error("Erreur lors de la génération du document Word", e);
            // Continuer quand même, le Word n'est pas critique
        }

        // Envoyer l'email de confirmation
        try {
            emailService.sendAbstractConfirmation(abstractEntity);
            log.info("Email de confirmation envoyé à: {}", abstractEntity.getEmail());
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'email de confirmation", e);
            // Continuer quand même
        }

        return abstractEntity;
    }

    /**
     * Génère un numéro de référence unique (SMCD2026-001, SMCD2026-002, etc.)
     */
    private String generateReferenceNumber() {
        Integer maxNumber = abstractRepository.findMaxReferenceNumber();
        int nextNumber = (maxNumber == null) ? 1 : maxNumber + 1;
        return String.format("SMCD2026-%03d", nextNumber);
    }

    /**
     * Récupère tous les abstracts avec filtres
     */
    public Page<AbstractResponseDTO> getAbstracts(
            StatutSoumission statut,
            Rubrique rubrique,
            LocalDateTime dateDebut,
            LocalDateTime dateFin,
            String search,
            Pageable pageable
    ) {
        Page<Abstract> abstracts;

        // Utiliser les méthodes de repository appropriées selon les filtres
        if (statut != null && rubrique != null) {
            abstracts = abstractRepository.findByStatutAndRubriqueAndDeletedFalseOrderByDateSoumissionDesc(statut, rubrique, pageable);
        } else if (statut != null) {
            abstracts = abstractRepository.findByStatutAndDeletedFalseOrderByDateSoumissionDesc(statut, pageable);
        } else if (rubrique != null) {
            abstracts = abstractRepository.findByRubriqueAndDeletedFalseOrderByDateSoumissionDesc(rubrique, pageable);
        } else {
            abstracts = abstractRepository.findByDeletedFalseOrderByDateSoumissionDesc(pageable);
        }

        return abstracts.map(AbstractResponseDTO::fromEntity);
    }

    /**
     * Récupère un abstract par son ID
     */
    public AbstractResponseDTO getAbstractById(Long id) {
        Abstract abstractEntity = abstractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Abstract non trouvé avec l'id: " + id));
        
        return AbstractResponseDTO.fromEntity(abstractEntity);
    }

    /**
     * Récupère un abstract par son numéro de référence
     */
    public AbstractResponseDTO getAbstractByReference(String numeroReference) {
        Abstract abstractEntity = abstractRepository.findByNumeroReference(numeroReference)
                .orElseThrow(() -> new ResourceNotFoundException("Abstract non trouvé avec le numéro: " + numeroReference));
        
        return AbstractResponseDTO.fromEntity(abstractEntity);
    }

    /**
     * Met à jour le statut d'un abstract
     */
    @Transactional
    public AbstractResponseDTO updateStatus(Long id, UpdateStatusDTO dto) {
        Abstract abstractEntity = abstractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Abstract non trouvé avec l'id: " + id));

        StatutSoumission ancienStatut = abstractEntity.getStatut();
        abstractEntity.setStatut(dto.getStatut());
        abstractEntity.setCommentairesComite(dto.getCommentaires());
        abstractEntity.setDateRevision(LocalDateTime.now());

        abstractEntity = abstractRepository.save(abstractEntity);
        log.info("Statut de l'abstract {} mis à jour: {} -> {}", 
                abstractEntity.getNumeroReference(), ancienStatut, dto.getStatut());

        // Envoyer email de notification si demandé
        if (Boolean.TRUE.equals(dto.getEnvoyerEmail())) {
            try {
                emailService.sendStatusNotification(abstractEntity, ancienStatut);
                log.info("Email de notification envoyé pour l'abstract: {}", abstractEntity.getNumeroReference());
            } catch (Exception e) {
                log.error("Erreur lors de l'envoi de l'email de notification", e);
            }
        }

        return AbstractResponseDTO.fromEntity(abstractEntity);
    }

    /**
     * Supprime un abstract (soft delete)
     */
    @Transactional
    public void deleteAbstract(Long id) {
        Abstract abstractEntity = abstractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Abstract non trouvé avec l'id: " + id));

        // Soft delete
        abstractEntity.setDeleted(true);
        abstractRepository.save(abstractEntity);
        log.info("Abstract {} supprimé (soft delete)", abstractEntity.getNumeroReference());

        // Supprimer le fichier Word de Cloudinary
        if (abstractEntity.getWordFileUrl() != null) {
            try {
                String publicId = cloudinaryService.extractPublicIdFromUrl(abstractEntity.getWordFileUrl());
                if (publicId != null) {
                    cloudinaryService.deleteFile(publicId);
                }
            } catch (Exception e) {
                log.warn("Impossible de supprimer le fichier Word de Cloudinary", e);
            }
        }
    }

    /**
     * Récupère les statistiques des abstracts
     */
    public AbstractStatsDTO getStats() {
        Long total = abstractRepository.countByDeletedFalse();
        Long enAttente = abstractRepository.countByStatutAndDeletedFalse(StatutSoumission.EN_ATTENTE);
        Long enRevision = abstractRepository.countByStatutAndDeletedFalse(StatutSoumission.EN_REVISION);
        Long acceptes = abstractRepository.countByStatutAndDeletedFalse(StatutSoumission.ACCEPTE);
        Long refuses = abstractRepository.countByStatutAndDeletedFalse(StatutSoumission.REFUSE);

        // Statistiques par rubrique
        Map<String, Long> parRubrique = new HashMap<>();
        List<Object[]> rubriqueStats = abstractRepository.countGroupByRubrique();
        for (Object[] row : rubriqueStats) {
            Rubrique rubrique = (Rubrique) row[0];
            Long count = (Long) row[1];
            parRubrique.put(rubrique.getLabel(), count);
        }

        // Statistiques par type
        Map<String, Long> parType = new HashMap<>();
        List<Object[]> typeStats = abstractRepository.countByType();
        for (Object[] row : typeStats) {
            TypeCommunication type = (TypeCommunication) row[0];
            Long count = (Long) row[1];
            parType.put(type.getLabel(), count);
        }

        // Soumissions par jour (30 derniers jours)
        LocalDateTime startDate = LocalDateTime.now().minusDays(30);
        List<Object[]> dailyStats = abstractRepository.countByDay(startDate);
        List<AbstractStatsDTO.SoumissionParJour> soumissionsParJour = dailyStats.stream()
                .map(row -> AbstractStatsDTO.SoumissionParJour.builder()
                        .date(row[0].toString())
                        .count((Long) row[1])
                        .build())
                .collect(Collectors.toList());

        return AbstractStatsDTO.builder()
                .total(total)
                .enAttente(enAttente)
                .enRevision(enRevision)
                .acceptes(acceptes)
                .refuses(refuses)
                .parRubrique(parRubrique)
                .parType(parType)
                .soumissionsParJour(soumissionsParJour)
                .build();
    }

    /**
     * Récupère tous les abstracts pour export
     */
    public List<AbstractResponseDTO> getAllForExport(StatutSoumission statut, Rubrique rubrique) {
        List<Abstract> abstracts;
        
        if (statut != null && rubrique != null) {
            abstracts = abstractRepository.findByStatutAndRubriqueAndDeletedFalse(statut, rubrique);
        } else if (statut != null) {
            abstracts = abstractRepository.findByStatutAndDeletedFalse(statut);
        } else if (rubrique != null) {
            abstracts = abstractRepository.findByRubriqueAndDeletedFalse(rubrique);
        } else {
            abstracts = abstractRepository.findByDeletedFalseOrderByDateSoumissionDesc();
        }

        return abstracts.stream()
                .map(AbstractResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}

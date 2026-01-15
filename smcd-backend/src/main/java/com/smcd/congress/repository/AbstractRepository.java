package com.smcd.congress.repository;

import com.smcd.congress.model.Abstract;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutSoumission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'entité Abstract
 * Fournit des méthodes de recherche et statistiques
 */
@Repository
public interface AbstractRepository extends JpaRepository<Abstract, Long> {

    // ============ RECHERCHES BASIQUES ============
    
    /**
     * Trouver tous les abstracts non supprimés
     */
    List<Abstract> findByDeletedFalseOrderByDateSoumissionDesc();

    /**
     * Trouver par statut
     */
    List<Abstract> findByStatutAndDeletedFalse(StatutSoumission statut);

    /**
     * Trouver par rubrique
     */
    List<Abstract> findByRubriqueAndDeletedFalse(Rubrique rubrique);

    /**
     * Trouver par statut et rubrique
     */
    List<Abstract> findByStatutAndRubriqueAndDeletedFalse(StatutSoumission statut, Rubrique rubrique);

    /**
     * Trouver par numéro de référence
     */
    Optional<Abstract> findByNumeroReference(String numeroReference);

    /**
     * Trouver par période de soumission
     */
    List<Abstract> findByDateSoumissionBetweenAndDeletedFalse(LocalDateTime start, LocalDateTime end);

    // ============ RECHERCHES PAGINÉES ============
    
    /**
     * Recherche paginée simple (sans filtres)
     */
    Page<Abstract> findByDeletedFalseOrderByDateSoumissionDesc(Pageable pageable);

    /**
     * Recherche paginée par statut
     */
    Page<Abstract> findByStatutAndDeletedFalseOrderByDateSoumissionDesc(StatutSoumission statut, Pageable pageable);

    /**
     * Recherche paginée par rubrique
     */
    Page<Abstract> findByRubriqueAndDeletedFalseOrderByDateSoumissionDesc(Rubrique rubrique, Pageable pageable);

    /**
     * Recherche paginée par statut et rubrique
     */
    Page<Abstract> findByStatutAndRubriqueAndDeletedFalseOrderByDateSoumissionDesc(StatutSoumission statut, Rubrique rubrique, Pageable pageable);

    // ============ STATISTIQUES ============
    
    /**
     * Compter par statut
     */
    Long countByStatutAndDeletedFalse(StatutSoumission statut);

    /**
     * Compter par rubrique
     */
    Long countByRubriqueAndDeletedFalse(Rubrique rubrique);

    /**
     * Compter le total non supprimé
     */
    Long countByDeletedFalse();

    /**
     * Compter le dernier numéro de référence
     */
    @Query("SELECT MAX(CAST(SUBSTRING(a.numeroReference, 10, 3) AS int)) FROM Abstract a " +
           "WHERE a.numeroReference LIKE 'SMCD2026-%'")
    Integer findMaxReferenceNumber();

    /**
     * Statistiques par type de communication
     */
    @Query("SELECT a.type, COUNT(a) FROM Abstract a WHERE a.deleted = false GROUP BY a.type")
    List<Object[]> countByType();

    /**
     * Statistiques par rubrique
     */
    @Query("SELECT a.rubrique, COUNT(a) FROM Abstract a WHERE a.deleted = false GROUP BY a.rubrique")
    List<Object[]> countGroupByRubrique();

    /**
     * Soumissions par jour (derniers 30 jours) - requête native PostgreSQL
     */
    @Query(value = "SELECT DATE(date_soumission) as jour, COUNT(*) as total FROM abstracts " +
           "WHERE deleted = false AND date_soumission >= :startDate " +
           "GROUP BY DATE(date_soumission) " +
           "ORDER BY DATE(date_soumission)", nativeQuery = true)
    List<Object[]> countByDay(@Param("startDate") LocalDateTime startDate);
}

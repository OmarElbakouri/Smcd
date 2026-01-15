package com.smcd.congress.repository;

import com.smcd.congress.model.Speaker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'accès aux données des Speakers
 */
@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, Long> {

    // ============ RECHERCHE PAR ANNÉE ============
    
    List<Speaker> findByAnneeOrderByOrdreAsc(Integer annee);
    
    List<Speaker> findByAnnee(Integer annee);

    // ============ INVITÉS D'HONNEUR ============
    
    List<Speaker> findByFeaturedTrueAndAnnee(Integer annee);
    
    List<Speaker> findByFeaturedTrueAndAnneeOrderByOrdreAsc(Integer annee);

    // ============ PRÉSIDENT ============
    
    Optional<Speaker> findByIsPresidentTrueAndAnnee(Integer annee);

    // ============ RECHERCHE PAR SPÉCIALITÉ ============
    
    List<Speaker> findBySpecialiteContainingIgnoreCase(String specialite);
    
    @Query("SELECT DISTINCT s.specialite FROM Speaker s WHERE s.specialite IS NOT NULL ORDER BY s.specialite")
    List<String> findDistinctSpecialites();

    // ============ RECHERCHE PAR PAYS ============
    
    List<Speaker> findByPays(String pays);
    
    List<Speaker> findByPaysAndAnnee(String pays, Integer annee);
    
    @Query("SELECT DISTINCT s.pays FROM Speaker s WHERE s.pays IS NOT NULL ORDER BY s.pays")
    List<String> findDistinctPays();

    // ============ ORDRE ============
    
    Optional<Speaker> findTopByAnneeOrderByOrdreDesc(Integer annee);
    
    @Query("SELECT COALESCE(MAX(s.ordre), 0) FROM Speaker s WHERE s.annee = :annee")
    Integer findMaxOrdreByAnnee(@Param("annee") Integer annee);

    // ============ RECHERCHE COMPLEXE ============
    
    @Query(value = "SELECT * FROM speakers s WHERE " +
           "(:annee IS NULL OR s.annee = :annee) AND " +
           "(:pays IS NULL OR s.pays = :pays) AND " +
           "(:specialite IS NULL OR LOWER(s.specialite::text) LIKE LOWER(CONCAT('%', :specialite, '%'))) AND " +
           "(:featured IS NULL OR s.featured = :featured) " +
           "ORDER BY s.ordre_affichage ASC", nativeQuery = true)
    List<Speaker> findWithFilters(
            @Param("annee") Integer annee,
            @Param("pays") String pays,
            @Param("specialite") String specialite,
            @Param("featured") Boolean featured
    );

    // ============ RECHERCHE TEXTE ============
    
    @Query(value = "SELECT * FROM speakers s WHERE s.annee = :annee AND " +
           "(LOWER(s.nom) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.prenom) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.specialite::text) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.institution) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY s.ordre_affichage ASC", nativeQuery = true)
    List<Speaker> searchByAnnee(
            @Param("annee") Integer annee,
            @Param("search") String search
    );

    // ============ COMPTAGES ============
    
    Long countByAnnee(Integer annee);
    
    Long countByFeaturedTrueAndAnnee(Integer annee);
    
    Long countByPays(String pays);

    // ============ STATISTIQUES ============
    
    @Query("SELECT s.pays, COUNT(s) FROM Speaker s WHERE s.annee = :annee GROUP BY s.pays ORDER BY COUNT(s) DESC")
    List<Object[]> countByPaysForAnnee(@Param("annee") Integer annee);
    
    @Query("SELECT s.specialite, COUNT(s) FROM Speaker s WHERE s.annee = :annee AND s.specialite IS NOT NULL GROUP BY s.specialite ORDER BY COUNT(s) DESC")
    List<Object[]> countBySpecialiteForAnnee(@Param("annee") Integer annee);

    @Query("SELECT DISTINCT s.annee FROM Speaker s ORDER BY s.annee DESC")
    List<Integer> findDistinctAnnees();
}

package com.smcd.congress.repository;

import com.smcd.congress.model.EPoster;
import com.smcd.congress.model.enums.Rubrique;
import com.smcd.congress.model.enums.StatutEPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'accès aux données des E-Posters
 */
@Repository
public interface EPosterRepository extends JpaRepository<EPoster, Long> {

    // ============ RECHERCHE PAR STATUT ============
    
    List<EPoster> findByStatut(StatutEPoster statut);
    
    List<EPoster> findByStatutOrderByDateUploadDesc(StatutEPoster statut);
    
    List<EPoster> findByStatutAndAnnee(StatutEPoster statut, Integer annee);
    
    List<EPoster> findByStatutAndAnneeOrderByDateUploadDesc(StatutEPoster statut, Integer annee);

    // ============ RECHERCHE PAR RUBRIQUE ============
    
    List<EPoster> findByRubrique(Rubrique rubrique);
    
    List<EPoster> findByRubriqueAndStatut(Rubrique rubrique, StatutEPoster statut);

    // ============ RECHERCHE PAR ANNÉE ============
    
    List<EPoster> findByAnnee(Integer annee);
    
    List<EPoster> findByAnneeAndStatut(Integer annee, StatutEPoster statut);
    
    List<EPoster> findByAnneeOrderByDateUploadDesc(Integer annee);

    // ============ COMPTAGES ============
    
    Long countByStatut(StatutEPoster statut);
    
    Long countByAnnee(Integer annee);
    
    Long countByAnneeAndStatut(Integer annee, StatutEPoster statut);
    
    Long countByRubriqueAndStatut(Rubrique rubrique, StatutEPoster statut);

    // ============ RECHERCHE COMPLEXE ============
    
    @Query("SELECT e FROM EPoster e WHERE " +
           "(:statut IS NULL OR e.statut = :statut) AND " +
           "(:annee IS NULL OR e.annee = :annee) AND " +
           "(:rubrique IS NULL OR e.rubrique = :rubrique) " +
           "ORDER BY e.dateUpload DESC")
    List<EPoster> findWithFilters(
            @Param("statut") StatutEPoster statut,
            @Param("annee") Integer annee,
            @Param("rubrique") Rubrique rubrique
    );

    // ============ RECHERCHE TEXTE ============
    
    @Query("SELECT e FROM EPoster e WHERE " +
           "e.statut = :statut AND " +
           "(LOWER(e.titre) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.nomAuteur) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.prenomAuteur) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY e.dateUpload DESC")
    List<EPoster> searchPublic(
            @Param("statut") StatutEPoster statut,
            @Param("search") String search
    );

    // ============ MISES À JOUR ATOMIQUES ============
    
    @Modifying
    @Query("UPDATE EPoster e SET e.nombreVues = e.nombreVues + 1 WHERE e.id = :id")
    void incrementerVues(@Param("id") Long id);

    @Modifying
    @Query("UPDATE EPoster e SET e.nombreTelechargements = e.nombreTelechargements + 1 WHERE e.id = :id")
    void incrementerTelechargements(@Param("id") Long id);

    // ============ STATISTIQUES ============
    
    @Query("SELECT SUM(e.tailleFichier) FROM EPoster e")
    Long getTailleTotale();
    
    @Query("SELECT SUM(e.tailleFichier) FROM EPoster e WHERE e.annee = :annee")
    Long getTailleTotaleParAnnee(@Param("annee") Integer annee);

    @Query("SELECT DISTINCT e.annee FROM EPoster e ORDER BY e.annee DESC")
    List<Integer> findDistinctAnnees();
}

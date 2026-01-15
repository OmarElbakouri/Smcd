package com.smcd.congress.repository;

import com.smcd.congress.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'accès aux données des Salles (Rooms)
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    // ============ RECHERCHE PAR ANNÉE ET STATUT ============
    
    List<Room> findByActiveTrueAndAnneeOrderByOrdreAsc(Integer annee);
    
    List<Room> findByAnneeOrderByOrdreAsc(Integer annee);
    
    List<Room> findByAnnee(Integer annee);

    // ============ RECHERCHE PAR SLUG ============
    
    Optional<Room> findBySlug(String slug);
    
    boolean existsBySlug(String slug);

    // ============ COMPTAGES ============
    
    Long countByAnnee(Integer annee);
    
    Long countByActiveTrueAndAnnee(Integer annee);

    // ============ ORDRE ============
    
    @Query("SELECT COALESCE(MAX(r.ordre), 0) FROM Room r WHERE r.annee = :annee")
    Integer findMaxOrdreByAnnee(@Param("annee") Integer annee);

    // ============ STATISTIQUES ============
    
    @Query("SELECT r.id, r.nom, COUNT(c) FROM Room r LEFT JOIN r.chapters c WHERE r.annee = :annee GROUP BY r.id, r.nom")
    List<Object[]> countChaptersByRoomForAnnee(@Param("annee") Integer annee);

    @Query("SELECT DISTINCT r.annee FROM Room r ORDER BY r.annee DESC")
    List<Integer> findDistinctAnnees();
}

package com.smcd.congress.repository;

import com.smcd.congress.model.Chapter;
import com.smcd.congress.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'accès aux données des Chapitres
 */
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    // ============ RECHERCHE PAR ROOM ============
    
    List<Chapter> findByRoomOrderByOrdreAsc(Room room);
    
    List<Chapter> findByRoomIdOrderByOrdreAsc(Long roomId);
    
    List<Chapter> findByRoom(Room room);

    // ============ RECHERCHE PAR SLUG ============
    
    Optional<Chapter> findBySlug(String slug);
    
    Optional<Chapter> findBySlugAndRoomId(String slug, Long roomId);
    
    boolean existsBySlug(String slug);
    
    boolean existsBySlugAndRoomId(String slug, Long roomId);

    // ============ COMPTAGES ============
    
    Long countByRoom(Room room);
    
    Long countByRoomId(Long roomId);

    // ============ ORDRE ============
    
    @Query("SELECT COALESCE(MAX(c.ordre), 0) FROM Chapter c WHERE c.room.id = :roomId")
    Integer findMaxOrdreByRoomId(@Param("roomId") Long roomId);

    // ============ RECHERCHE AVEC VIDÉOS ============
    
    @Query("SELECT c FROM Chapter c LEFT JOIN FETCH c.videos WHERE c.room.id = :roomId ORDER BY c.ordre ASC")
    List<Chapter> findByRoomIdWithVideos(@Param("roomId") Long roomId);

    // ============ STATISTIQUES ============
    
    @Query("SELECT c.id, c.titre, COUNT(v) FROM Chapter c LEFT JOIN c.videos v WHERE c.room.id = :roomId GROUP BY c.id, c.titre")
    List<Object[]> countVideosByChapterForRoom(@Param("roomId") Long roomId);

    @Query("SELECT c.moderateur, COUNT(c) FROM Chapter c WHERE c.moderateur IS NOT NULL GROUP BY c.moderateur ORDER BY COUNT(c) DESC")
    List<Object[]> countChaptersByModerateur();
}

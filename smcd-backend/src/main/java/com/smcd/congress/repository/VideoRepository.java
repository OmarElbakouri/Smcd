package com.smcd.congress.repository;

import com.smcd.congress.model.Chapter;
import com.smcd.congress.model.Video;
import com.smcd.congress.model.enums.VisibiliteVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'accès aux données des Vidéos
 */
@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    // ============ RECHERCHE PAR CHAPITRE ============
    
    List<Video> findByChapterOrderByOrdreAsc(Chapter chapter);
    
    List<Video> findByChapterIdOrderByOrdreAsc(Long chapterId);
    
    List<Video> findByChapterIdAndPublieTrueOrderByOrdreAsc(Long chapterId);

    // ============ RECHERCHE PAR VISIBILITÉ ============
    
    List<Video> findByPublieTrueAndVisibiliteOrderByDatePublicationDesc(VisibiliteVideo visibilite);
    
    List<Video> findByPublieTrueOrderByDatePublicationDesc();

    // ============ RECHERCHE PAR SLUG ============
    
    Optional<Video> findBySlug(String slug);
    
    Optional<Video> findBySlugAndChapterId(String slug, Long chapterId);
    
    boolean existsBySlug(String slug);

    // ============ COMPTAGES ============
    
    Long countByChapter(Chapter chapter);
    
    Long countByChapterId(Long chapterId);
    
    Long countByPublieTrue();
    
    Long countByPublieFalse();
    
    Long countByVisibilite(VisibiliteVideo visibilite);

    // ============ VIDÉOS POPULAIRES ============
    
    List<Video> findTop10ByPublieTrueOrderByNombreVuesDesc();
    
    @Query("SELECT v FROM Video v WHERE v.publie = true ORDER BY v.nombreVues DESC")
    List<Video> findTopVideos(org.springframework.data.domain.Pageable pageable);

    // ============ ORDRE ============
    
    @Query("SELECT COALESCE(MAX(v.ordre), 0) FROM Video v WHERE v.chapter.id = :chapterId")
    Integer findMaxOrdreByChapterId(@Param("chapterId") Long chapterId);

    // ============ INCRÉMENTS ============
    
    @Modifying
    @Query("UPDATE Video v SET v.nombreVues = v.nombreVues + 1 WHERE v.id = :id")
    void incrementerVues(@Param("id") Long id);
    
    @Modifying
    @Query("UPDATE Video v SET v.nombreLikes = v.nombreLikes + 1 WHERE v.id = :id")
    void incrementerLikes(@Param("id") Long id);

    // ============ RECHERCHE TEXTE ============
    
    @Query("SELECT v FROM Video v WHERE v.publie = true AND " +
           "(LOWER(v.titre) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.tags) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.intervenant) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "ORDER BY v.nombreVues DESC")
    List<Video> searchVideos(@Param("query") String query);

    // ============ STATISTIQUES ============
    
    @Query("SELECT SUM(v.nombreVues) FROM Video v")
    Long getTotalVues();
    
    @Query("SELECT SUM(v.duree) FROM Video v")
    Long getTotalDureeSecondes();
    
    @Query("SELECT SUM(v.tailleFichier) FROM Video v")
    Long getTotalTailleFichier();

    @Query("SELECT v.langue, COUNT(v) FROM Video v GROUP BY v.langue")
    List<Object[]> countByLangue();

    @Query("SELECT v.visibilite, COUNT(v) FROM Video v GROUP BY v.visibilite")
    List<Object[]> countByVisibilite();

    // ============ VIDÉOS PAR INTERVENANT ============
    
    List<Video> findByIntervenantContainingIgnoreCase(String intervenant);
    
    @Query("SELECT DISTINCT v.intervenant FROM Video v WHERE v.intervenant IS NOT NULL ORDER BY v.intervenant")
    List<String> findDistinctIntervenants();

    // ============ VIDÉOS RÉCENTES ============
    
    @Query("SELECT v FROM Video v WHERE v.publie = true ORDER BY v.datePublication DESC")
    List<Video> findRecentVideos(org.springframework.data.domain.Pageable pageable);
}

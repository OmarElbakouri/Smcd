package com.smcd.congress.repository;

import com.smcd.congress.model.Document;
import com.smcd.congress.model.enums.TypeDocument;
import com.smcd.congress.model.enums.VisibiliteDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByPublieTrueAndVisibiliteOrderByOrdreAsc(VisibiliteDocument visibilite);

    List<Document> findByTypeAndPublieTrueOrderByOrdreAsc(TypeDocument type);

    List<Document> findByAnneeAndPublieTrueOrderByOrdreAsc(Integer annee);

    List<Document> findByTypeAndAnneeAndPublieTrueOrderByOrdreAsc(TypeDocument type, Integer annee);

    Long countByType(TypeDocument type);

    Long countByPublieTrue();

    Optional<Document> findBySlug(String slug);

    @Query("SELECT d.type, COUNT(d) FROM Document d WHERE d.publie = true GROUP BY d.type")
    List<Object[]> countByTypeGrouped();

    @Query("SELECT SUM(d.nombreTelechargements) FROM Document d")
    Long sumTelechargements();
}

package com.smcd.congress.repository;

import com.smcd.congress.model.Sponsor;
import com.smcd.congress.model.enums.NiveauSponsor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SponsorRepository extends JpaRepository<Sponsor, Long> {

    List<Sponsor> findByActiveTrueAndAnneeOrderByNiveauAscOrdreAsc(Integer annee);

    List<Sponsor> findByNiveauAndActiveTrueOrderByOrdreAsc(NiveauSponsor niveau);

    List<Sponsor> findByAnneeOrderByNiveauAscOrdreAsc(Integer annee);

    Long countByActiveTrue();

    Long countByNiveau(NiveauSponsor niveau);

    Optional<Sponsor> findBySlug(String slug);
    
    boolean existsBySlug(String slug);
}

package com.smcd.congress.repository;

import com.smcd.congress.model.Archive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArchiveRepository extends JpaRepository<Archive, Long> {

    List<Archive> findAllByOrderByAnneeDesc();

    Optional<Archive> findByAnnee(Integer annee);

    boolean existsByAnnee(Integer annee);
}

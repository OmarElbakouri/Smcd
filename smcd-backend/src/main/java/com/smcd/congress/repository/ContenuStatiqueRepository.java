package com.smcd.congress.repository;

import com.smcd.congress.model.ContenuStatique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContenuStatiqueRepository extends JpaRepository<ContenuStatique, Long> {

    Optional<ContenuStatique> findByCle(String cle);

    boolean existsByCle(String cle);
}

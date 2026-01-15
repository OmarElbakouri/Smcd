package com.smcd.congress.repository;

import com.smcd.congress.model.NewsletterSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {

    Optional<NewsletterSubscriber> findByEmail(String email);

    Optional<NewsletterSubscriber> findByTokenDesinscription(String token);

    List<NewsletterSubscriber> findByActifTrueOrderByDateInscriptionDesc();

    Long countByActifTrue();

    @Query("SELECT COUNT(n) FROM NewsletterSubscriber n WHERE n.actif = true AND n.dateInscription >= :since")
    Long countNewSubscribersSince(@Param("since") LocalDateTime since);

    boolean existsByEmail(String email);
}

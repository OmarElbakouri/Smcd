package com.smcd.congress.repository;

import com.smcd.congress.model.CommunicationVideo;
import com.smcd.congress.model.enums.StatutCommunication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunicationVideoRepository extends JpaRepository<CommunicationVideo, Long> {
    
    List<CommunicationVideo> findByStatutOrderByDateUploadDesc(StatutCommunication statut);
    
    List<CommunicationVideo> findByStatutAndAnneeOrderByDateUploadDesc(StatutCommunication statut, Integer annee);
    
    List<CommunicationVideo> findByEmailAuteurOrderByDateUploadDesc(String email);
    
    Long countByStatut(StatutCommunication statut);
    
    Long countByAnnee(Integer annee);
}

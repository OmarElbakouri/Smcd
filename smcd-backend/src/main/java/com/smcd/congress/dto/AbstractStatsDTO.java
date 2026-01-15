package com.smcd.congress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * DTO pour les statistiques des abstracts
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbstractStatsDTO {

    private Long total;
    private Long enAttente;
    private Long enRevision;
    private Long acceptes;
    private Long refuses;
    private Map<String, Long> parRubrique;
    private Map<String, Long> parType;
    private List<SoumissionParJour> soumissionsParJour;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SoumissionParJour {
        private String date;
        private Long count;
    }
}

package com.smcd.congress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * DTO pour les statistiques des E-Posters
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EPosterStatsDTO {

    private Long total;
    private Long enAttente;
    private Long approuves;
    private Long rejetes;
    private Map<Integer, Long> parAnnee;
    private Map<String, Long> parRubrique;
    private String tailleTotale;
}

package com.smcd.congress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * DTO pour les statistiques des Speakers
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakerStatsDTO {

    private Long total;
    private Long featured;
    private Map<String, Long> parPays;
    private Map<String, Long> parSpecialite;
}

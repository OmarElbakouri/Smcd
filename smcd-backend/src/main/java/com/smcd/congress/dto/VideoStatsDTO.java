package com.smcd.congress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * DTO pour les statistiques globales des vidéos
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoStatsDTO {

    private Long totalSalles;
    private Long totalChapitres;
    private Long totalVideos;
    private Long videosPubliees;
    private Long videosBrouillon;
    private Long totalVues;
    private String dureeTotale;
    private String espaceDiskUtilise;
    
    // Répartitions
    private Map<String, Long> videosParLangue;
    private Map<String, Long> videosParVisibilite;
    
    // Top vidéos
    private List<VideoResponseDTO> topVideos;
    private List<VideoResponseDTO> videosRecentes;
}

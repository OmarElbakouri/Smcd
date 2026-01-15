package com.smcd.congress.dto;

import com.smcd.congress.model.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de réponse pour une Room (public)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDTO {

    private Long id;
    private String nom;
    private String nomCourt;
    private String slug;
    private String description;
    private String descriptionCourte;
    private String imageUrl;
    private String couleur;
    private String icone;
    private Integer ordre;
    private Integer annee;
    private Boolean active;
    
    // Statistiques calculées
    private Integer nombreChapitres;
    private Integer nombreVideos;
    private String dureeTotale;
    
    private LocalDateTime dateCreation;
    
    // Chapitres (optionnel, pour vue détaillée)
    private List<ChapterResponseDTO> chapters;

    /**
     * Convertit une Room en RoomResponseDTO (sans chapitres)
     */
    public static RoomResponseDTO fromRoom(Room room) {
        return RoomResponseDTO.builder()
                .id(room.getId())
                .nom(room.getNom())
                .nomCourt(room.getNomCourt())
                .slug(room.getSlug())
                .description(room.getDescription())
                .descriptionCourte(room.getDescriptionCourte())
                .imageUrl(room.getImageUrl())
                .couleur(room.getCouleur())
                .icone(room.getIcone())
                .ordre(room.getOrdre())
                .annee(room.getAnnee())
                .active(room.getActive())
                .nombreChapitres(room.getNombreChapitres())
                .nombreVideos(room.getNombreVideos())
                .dureeTotale(room.getDureeTotaleFormatee())
                .dateCreation(room.getDateCreation())
                .build();
    }

    /**
     * Convertit une Room en RoomResponseDTO avec chapitres
     */
    public static RoomResponseDTO fromRoomWithChapters(Room room) {
        RoomResponseDTO dto = fromRoom(room);
        if (room.getChapters() != null) {
            dto.setChapters(room.getChapters().stream()
                    .map(ChapterResponseDTO::fromChapter)
                    .toList());
        }
        return dto;
    }
}

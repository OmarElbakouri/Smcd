package com.smcd.congress.dto;

import com.smcd.congress.model.Chapter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

/**
 * DTO de réponse pour un Chapter (public)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChapterResponseDTO {

    private Long id;
    private String titre;
    private String slug;
    private String description;
    private String descriptionCourte;
    private String moderateur;
    private LocalDate dateSession;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private String horaireSession;
    private Integer ordre;
    
    // Info parent
    private Long roomId;
    private String roomNom;
    private String roomSlug;
    
    // Statistiques calculées
    private Integer nombreVideos;
    private String dureeTotale;
    
    private LocalDateTime dateCreation;
    
    // Vidéos (optionnel, pour vue détaillée)
    private List<VideoResponseDTO> videos;

    /**
     * Convertit un Chapter en ChapterResponseDTO (sans vidéos)
     */
    public static ChapterResponseDTO fromChapter(Chapter chapter) {
        ChapterResponseDTO.ChapterResponseDTOBuilder builder = ChapterResponseDTO.builder()
                .id(chapter.getId())
                .titre(chapter.getTitre())
                .slug(chapter.getSlug())
                .description(chapter.getDescription())
                .descriptionCourte(chapter.getDescriptionCourte())
                .moderateur(chapter.getModerateur())
                .dateSession(chapter.getDateSession())
                .heureDebut(chapter.getHeureDebut())
                .heureFin(chapter.getHeureFin())
                .horaireSession(chapter.getHoraireSession())
                .ordre(chapter.getOrdre())
                .nombreVideos(chapter.getNombreVideos())
                .dureeTotale(chapter.getDureeTotaleFormatee())
                .dateCreation(chapter.getDateCreation());

        if (chapter.getRoom() != null) {
            builder.roomId(chapter.getRoom().getId())
                   .roomNom(chapter.getRoom().getNom())
                   .roomSlug(chapter.getRoom().getSlug());
        }

        return builder.build();
    }

    /**
     * Convertit un Chapter en ChapterResponseDTO avec vidéos
     */
    public static ChapterResponseDTO fromChapterWithVideos(Chapter chapter) {
        ChapterResponseDTO dto = fromChapter(chapter);
        if (chapter.getVideos() != null) {
            dto.setVideos(chapter.getVideos().stream()
                    .map(VideoResponseDTO::fromVideo)
                    .toList());
        }
        return dto;
    }
}

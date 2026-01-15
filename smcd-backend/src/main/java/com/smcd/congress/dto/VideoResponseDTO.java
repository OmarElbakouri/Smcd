package com.smcd.congress.dto;

import com.smcd.congress.model.Video;
import com.smcd.congress.model.enums.VisibiliteVideo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de réponse pour une Video (public)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoResponseDTO {

    private Long id;
    private String titre;
    private String slug;
    private String description;
    private String descriptionCourte;
    private String intervenant;
    private String coIntervenants;
    
    // URLs
    private String videoUrl;
    private String streamingUrl;
    private String thumbnailUrl;
    
    // Métadonnées vidéo
    private Integer duree;
    private String dureeFr;
    private String format;
    private String resolution;
    private String tailleFormatee;
    
    // Contenu
    private String tags;
    private String[] tagsArray;
    private String langue;
    private String sousTitresUrl;
    
    // Visibilité
    private VisibiliteVideo visibilite;
    private String visibiliteLabel;
    private Boolean publie;
    
    // Organisation
    private Integer ordre;
    private Long chapterId;
    private String chapterTitre;
    private String chapterSlug;
    private Long roomId;
    private String roomNom;
    private String roomSlug;
    
    // Statistiques
    private Integer nombreVues;
    private Integer nombreLikes;
    
    // Dates
    private LocalDateTime dateUpload;
    private LocalDateTime datePublication;

    /**
     * Convertit une Video en VideoResponseDTO
     */
    public static VideoResponseDTO fromVideo(Video video) {
        VideoResponseDTO.VideoResponseDTOBuilder builder = VideoResponseDTO.builder()
                .id(video.getId())
                .titre(video.getTitre())
                .slug(video.getSlug())
                .description(video.getDescription())
                .descriptionCourte(video.getDescriptionCourte())
                .intervenant(video.getIntervenant())
                .coIntervenants(video.getCoIntervenants())
                .videoUrl(video.getVideoUrl())
                .streamingUrl(video.getStreamingUrl())
                .thumbnailUrl(video.getThumbnailUrl())
                .duree(video.getDuree())
                .dureeFr(video.getDureeFormatee())
                .format(video.getFormat())
                .resolution(video.getResolution())
                .tailleFormatee(video.getTailleFormatee())
                .tags(video.getTags())
                .tagsArray(video.getTagsArray())
                .langue(video.getLangue())
                .sousTitresUrl(video.getSousTitresUrl())
                .visibilite(video.getVisibilite())
                .visibiliteLabel(video.getVisibilite() != null ? video.getVisibilite().getLabel() : null)
                .publie(video.getPublie())
                .ordre(video.getOrdre())
                .nombreVues(video.getNombreVues())
                .nombreLikes(video.getNombreLikes())
                .dateUpload(video.getDateUpload())
                .datePublication(video.getDatePublication());

        if (video.getChapter() != null) {
            builder.chapterId(video.getChapter().getId())
                   .chapterTitre(video.getChapter().getTitre())
                   .chapterSlug(video.getChapter().getSlug());
            
            if (video.getChapter().getRoom() != null) {
                builder.roomId(video.getChapter().getRoom().getId())
                       .roomNom(video.getChapter().getRoom().getNom())
                       .roomSlug(video.getChapter().getRoom().getSlug());
            }
        }

        return builder.build();
    }
}

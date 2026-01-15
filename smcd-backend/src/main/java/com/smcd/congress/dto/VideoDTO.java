package com.smcd.congress.dto;

import com.smcd.congress.model.enums.VisibiliteVideo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création/modification d'une Video
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300, message = "Le titre ne peut pas dépasser 300 caractères")
    private String titre;

    private String description;

    @Size(max = 300, message = "La description courte ne peut pas dépasser 300 caractères")
    private String descriptionCourte;

    @Size(max = 200, message = "L'intervenant ne peut pas dépasser 200 caractères")
    private String intervenant;

    @Size(max = 500, message = "Les co-intervenants ne peuvent pas dépasser 500 caractères")
    private String coIntervenants;

    @Size(max = 500, message = "Les tags ne peuvent pas dépasser 500 caractères")
    private String tags;

    @Size(max = 5)
    @Builder.Default
    private String langue = "FR";

    @Builder.Default
    private VisibiliteVideo visibilite = VisibiliteVideo.PUBLIC;

    @NotNull(message = "L'ID du chapitre est obligatoire")
    private Long chapterId;
}

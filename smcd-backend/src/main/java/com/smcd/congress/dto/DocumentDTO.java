package com.smcd.congress.dto;

import com.smcd.congress.model.enums.TypeDocument;
import com.smcd.congress.model.enums.VisibiliteDocument;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 300)
    private String titre;

    private String description;

    @Size(max = 300)
    private String descriptionCourte;

    private TypeDocument type;

    private Integer annee = 2026;

    private String langue = "FR";

    private VisibiliteDocument visibilite = VisibiliteDocument.PUBLIC;

    private Boolean publie = true;

    private Integer ordre = 0;

    private Boolean featured = false;
}

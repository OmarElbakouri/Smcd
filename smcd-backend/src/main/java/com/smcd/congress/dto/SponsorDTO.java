package com.smcd.congress.dto;

import com.smcd.congress.model.enums.NiveauSponsor;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SponsorDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 200)
    private String nom;

    @Size(max = 100)
    private String nomCourt;

    private String description;

    @Size(max = 300)
    private String descriptionCourte;

    @NotNull(message = "Le niveau est obligatoire")
    private NiveauSponsor niveau;

    @Size(max = 100)
    private String categorie;

    private Integer annee = 2026;

    private String siteWeb;

    @Email
    private String email;

    @Size(max = 30)
    private String telephone;

    private Integer ordre = 0;

    private Boolean active = true;
}

package com.smcd.congress.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContenuDTO {

    @Size(max = 200)
    private String titreFr;

    @Size(max = 200)
    private String titreEn;

    private String contenuFr;

    private String contenuEn;
}

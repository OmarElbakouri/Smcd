package com.smcd.congress.dto;

import com.smcd.congress.model.enums.StatutSoumission;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la mise à jour du statut d'un abstract
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusDTO {

    @NotNull(message = "Le statut est obligatoire")
    private StatutSoumission statut;

    private String commentaires;

    private Boolean envoyerEmail = true;
}

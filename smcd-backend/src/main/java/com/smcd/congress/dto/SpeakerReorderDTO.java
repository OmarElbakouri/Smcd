package com.smcd.congress.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO pour la réorganisation des speakers
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpeakerReorderDTO {

    @NotEmpty(message = "La liste des IDs ne peut pas être vide")
    private List<Long> idsOrdre;
}

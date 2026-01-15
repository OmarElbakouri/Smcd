package com.smcd.congress.service;

import com.smcd.congress.dto.ContenuDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.ContenuStatique;
import com.smcd.congress.repository.ContenuStatiqueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContenuService {

    private final ContenuStatiqueRepository contenuRepository;
    private final CloudinaryService cloudinaryService;

    public ContenuStatique getContenu(String cle) {
        return contenuRepository.findByCle(cle)
                .orElseThrow(() -> new ResourceNotFoundException("Contenu non trouvé: " + cle));
    }

    public List<ContenuStatique> getAllContenus() {
        return contenuRepository.findAll();
    }

    @Transactional
    public ContenuStatique updateContenu(String cle, ContenuDTO dto, MultipartFile image, String modifiePar) throws IOException {
        ContenuStatique contenu = contenuRepository.findByCle(cle)
                .orElse(ContenuStatique.builder().cle(cle).build());

        contenu.setTitreFr(dto.getTitreFr());
        contenu.setTitreEn(dto.getTitreEn());
        contenu.setContenuFr(dto.getContenuFr());
        contenu.setContenuEn(dto.getContenuEn());
        contenu.setModifiePar(modifiePar);

        if (image != null && !image.isEmpty()) {
            if (contenu.getImagePublicId() != null) {
                cloudinaryService.deleteFile(contenu.getImagePublicId());
            }
            java.util.Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "contenu");
            contenu.setImageUrl(uploadResult.get("url"));
            contenu.setImagePublicId(uploadResult.get("publicId"));
        }

        return contenuRepository.save(contenu);
    }

    @Transactional
    public void initDefaultContent() {
        String[] cles = {
            "mot_president", "a_propos", "mission", "vision", "valeurs",
            "histoire", "comite_organisation", "comite_scientifique",
            "mentions_legales", "politique_confidentialite", "cgu"
        };

        for (String cle : cles) {
            if (!contenuRepository.existsByCle(cle)) {
                ContenuStatique contenu = ContenuStatique.builder()
                        .cle(cle)
                        .titreFr(formatTitle(cle))
                        .contenuFr("<p>Contenu à définir...</p>")
                        .build();
                contenuRepository.save(contenu);
                log.info("Contenu par défaut créé: {}", cle);
            }
        }
    }

    private String formatTitle(String cle) {
        return cle.replace("_", " ").substring(0, 1).toUpperCase() + 
               cle.replace("_", " ").substring(1);
    }
}

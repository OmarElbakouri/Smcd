package com.smcd.congress.service;

import com.smcd.congress.dto.SponsorDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Sponsor;
import com.smcd.congress.model.enums.NiveauSponsor;
import com.smcd.congress.repository.SponsorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class SponsorService {

    private final SponsorRepository sponsorRepository;
    private final CloudinaryService cloudinaryService;

    /**
     * Génère un slug unique à partir du nom
     */
    private String generateUniqueSlug(String nom) {
        String baseSlug = nom.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
        
        String slug = baseSlug;
        int counter = 1;
        
        while (sponsorRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        return slug;
    }

    @Transactional
    public Sponsor creerSponsor(SponsorDTO dto, MultipartFile logo) throws IOException {
        log.info("Création sponsor: {}", dto.getNom());

        java.util.Map<String, String> uploadResult = cloudinaryService.uploadFile(logo, "sponsors");
        String logoUrl = uploadResult.get("url");

        // Générer un slug unique
        String uniqueSlug = generateUniqueSlug(dto.getNom());

        Sponsor sponsor = Sponsor.builder()
                .nom(dto.getNom())
                .nomCourt(dto.getNomCourt())
                .description(dto.getDescription())
                .descriptionCourte(dto.getDescriptionCourte())
                .logoUrl(logoUrl)
                .niveau(dto.getNiveau() != null ? dto.getNiveau() : NiveauSponsor.BRONZE)
                .categorie(dto.getCategorie())
                .annee(dto.getAnnee() != null ? dto.getAnnee() : 2026)
                .siteWeb(dto.getSiteWeb())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .ordre(dto.getOrdre() != null ? dto.getOrdre() : 0)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .slug(uniqueSlug)
                .build();

        return sponsorRepository.save(sponsor);
    }

    @Transactional
    public Sponsor modifierSponsor(Long id, SponsorDTO dto, MultipartFile newLogo) throws IOException {
        Sponsor sponsor = sponsorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sponsor non trouvé: " + id));

        sponsor.setNom(dto.getNom());
        sponsor.setNomCourt(dto.getNomCourt());
        sponsor.setDescription(dto.getDescription());
        sponsor.setDescriptionCourte(dto.getDescriptionCourte());
        sponsor.setNiveau(dto.getNiveau());
        sponsor.setCategorie(dto.getCategorie());
        sponsor.setAnnee(dto.getAnnee());
        sponsor.setSiteWeb(dto.getSiteWeb());
        sponsor.setEmail(dto.getEmail());
        sponsor.setTelephone(dto.getTelephone());
        sponsor.setOrdre(dto.getOrdre());
        sponsor.setActive(dto.getActive());

        if (newLogo != null && !newLogo.isEmpty()) {
            if (sponsor.getLogoPublicId() != null) {
                cloudinaryService.deleteFile(sponsor.getLogoPublicId());
            }
            java.util.Map<String, String> uploadResult = cloudinaryService.uploadFile(newLogo, "sponsors");
            sponsor.setLogoUrl(uploadResult.get("url"));
            sponsor.setLogoPublicId(uploadResult.get("publicId"));
        }

        return sponsorRepository.save(sponsor);
    }

    @Transactional
    public void supprimerSponsor(Long id) {
        Sponsor sponsor = sponsorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sponsor non trouvé: " + id));

        if (sponsor.getLogoPublicId() != null) {
            cloudinaryService.deleteFile(sponsor.getLogoPublicId());
        }

        sponsorRepository.delete(sponsor);
        log.info("Sponsor supprimé: {}", id);
    }

    @Transactional
    public void incrementerClics(Long id) {
        Sponsor sponsor = sponsorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sponsor non trouvé: " + id));
        sponsor.setNombreClics(sponsor.getNombreClics() + 1);
        sponsorRepository.save(sponsor);
    }

    public Map<String, List<Sponsor>> getSponsorsPublics(Integer annee) {
        List<Sponsor> sponsors = sponsorRepository.findByActiveTrueAndAnneeOrderByNiveauAscOrdreAsc(annee);
        
        return sponsors.stream()
                .collect(Collectors.groupingBy(
                        s -> s.getNiveau().getNom(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));
    }

    public Sponsor getById(Long id) {
        return sponsorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sponsor non trouvé: " + id));
    }

    public List<Sponsor> getAll(Integer annee) {
        if (annee != null) {
            return sponsorRepository.findByAnneeOrderByNiveauAscOrdreAsc(annee);
        }
        return sponsorRepository.findAll();
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", sponsorRepository.countByActiveTrue());

        Map<String, Long> parNiveau = new HashMap<>();
        for (NiveauSponsor niveau : NiveauSponsor.values()) {
            parNiveau.put(niveau.getNom(), sponsorRepository.countByNiveau(niveau));
        }
        stats.put("parNiveau", parNiveau);

        return stats;
    }
}

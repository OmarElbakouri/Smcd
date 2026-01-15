package com.smcd.congress.service;

import com.smcd.congress.dto.DocumentDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Document;
import com.smcd.congress.model.enums.TypeDocument;
import com.smcd.congress.model.enums.VisibiliteDocument;
import com.smcd.congress.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final CloudinaryService cloudinaryService;

    @Transactional
    public Document uploadDocument(MultipartFile file, DocumentDTO dto) throws IOException {
        log.info("Upload document: {}", dto.getTitre());

        // Upload vers Cloudinary (raw pour les PDF/Word)
        Map<String, String> uploadResult = cloudinaryService.uploadRawFile(file, "documents/" + dto.getAnnee());
        String url = uploadResult.get("url");
        String publicId = uploadResult.get("publicId");

        // Déterminer le format
        String originalFilename = file.getOriginalFilename();
        String format = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            format = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toUpperCase();
        }

        Document document = Document.builder()
                .titre(dto.getTitre())
                .description(dto.getDescription())
                .descriptionCourte(dto.getDescriptionCourte())
                .fichierUrl(url)
                .fichierPublicId(publicId)
                .tailleFichier(file.getSize())
                .nomFichierOriginal(originalFilename)
                .formatFichier(format)
                .type(dto.getType())
                .annee(dto.getAnnee() != null ? dto.getAnnee() : 2026)
                .langue(dto.getLangue() != null ? dto.getLangue() : "FR")
                .visibilite(dto.getVisibilite())
                .publie(dto.getPublie() != null ? dto.getPublie() : true)
                .ordre(dto.getOrdre() != null ? dto.getOrdre() : 0)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .build();

        return documentRepository.save(document);
    }

    @Transactional
    public Document modifierDocument(Long id, DocumentDTO dto, MultipartFile newFile) throws IOException {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document non trouvé: " + id));

        document.setTitre(dto.getTitre());
        document.setDescription(dto.getDescription());
        document.setDescriptionCourte(dto.getDescriptionCourte());
        document.setType(dto.getType());
        document.setAnnee(dto.getAnnee());
        document.setLangue(dto.getLangue());
        document.setVisibilite(dto.getVisibilite());
        document.setPublie(dto.getPublie());
        document.setOrdre(dto.getOrdre());
        document.setFeatured(dto.getFeatured());

        if (newFile != null && !newFile.isEmpty()) {
            // Supprimer ancien fichier
            if (document.getFichierPublicId() != null) {
                cloudinaryService.deleteFile(document.getFichierPublicId());
            }
            
            // Upload nouveau (raw pour les PDF/Word)
            Map<String, String> uploadResult = cloudinaryService.uploadRawFile(newFile, "documents/" + dto.getAnnee());
            document.setFichierUrl(uploadResult.get("url"));
            document.setFichierPublicId(uploadResult.get("publicId"));
            document.setTailleFichier(newFile.getSize());
            document.setNomFichierOriginal(newFile.getOriginalFilename());
        }

        return documentRepository.save(document);
    }

    @Transactional
    public void supprimerDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document non trouvé: " + id));

        if (document.getFichierPublicId() != null) {
            cloudinaryService.deleteFile(document.getFichierPublicId());
        }

        documentRepository.delete(document);
        log.info("Document supprimé: {}", id);
    }

    @Transactional
    public void incrementerTelechargements(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document non trouvé: " + id));
        document.setNombreTelechargements(document.getNombreTelechargements() + 1);
        documentRepository.save(document);
    }

    public List<Document> getDocumentsPublics(TypeDocument type, Integer annee) {
        if (type != null && annee != null) {
            return documentRepository.findByTypeAndAnneeAndPublieTrueOrderByOrdreAsc(type, annee);
        } else if (type != null) {
            return documentRepository.findByTypeAndPublieTrueOrderByOrdreAsc(type);
        } else if (annee != null) {
            return documentRepository.findByAnneeAndPublieTrueOrderByOrdreAsc(annee);
        }
        return documentRepository.findByPublieTrueAndVisibiliteOrderByOrdreAsc(VisibiliteDocument.PUBLIC);
    }

    public Document getById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document non trouvé: " + id));
    }

    public List<Document> getAll() {
        return documentRepository.findAll();
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", documentRepository.countByPublieTrue());
        stats.put("totalTelechargements", documentRepository.sumTelechargements());

        Map<String, Long> parType = new HashMap<>();
        documentRepository.countByTypeGrouped().forEach(row -> {
            TypeDocument type = (TypeDocument) row[0];
            Long count = (Long) row[1];
            parType.put(type.getLabel(), count);
        });
        stats.put("parType", parType);

        return stats;
    }
}

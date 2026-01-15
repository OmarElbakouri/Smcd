package com.smcd.congress.service;

import com.smcd.congress.dto.ArchiveDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Archive;
import com.smcd.congress.repository.ArchiveRepository;
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
public class ArchiveService {

    private final ArchiveRepository archiveRepository;
    private final CloudinaryService cloudinaryService;

    public List<Archive> getAllArchives() {
        return archiveRepository.findAllByOrderByAnneeDesc();
    }

    public Archive getByAnnee(Integer annee) {
        return archiveRepository.findByAnnee(annee)
                .orElseThrow(() -> new ResourceNotFoundException("Archive non trouvée pour l'année: " + annee));
    }

    public Archive getById(Long id) {
        return archiveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Archive non trouvée: " + id));
    }

    @Transactional
    public Archive creerArchive(ArchiveDTO dto, MultipartFile image) throws IOException {
        if (archiveRepository.existsByAnnee(dto.getAnnee())) {
            throw new IllegalArgumentException("Une archive existe déjà pour l'année " + dto.getAnnee());
        }

        Archive archive = Archive.builder()
                .annee(dto.getAnnee())
                .theme(dto.getTheme())
                .lieu(dto.getLieu())
                .dateDebut(dto.getDateDebut())
                .dateFin(dto.getDateFin())
                .description(dto.getDescription())
                .urlExterne(dto.getUrlExterne())
                .nombreParticipants(dto.getNombreParticipants())
                .nombreAbstracts(dto.getNombreAbstracts())
                .build();

        if (image != null && !image.isEmpty()) {
            java.util.Map<String, String> uploadResult = cloudinaryService.uploadFile(image, "archives");
            archive.setImageUrl(uploadResult.get("url"));
            archive.setImagePublicId(uploadResult.get("publicId"));
        }

        return archiveRepository.save(archive);
    }

    @Transactional
    public Archive modifierArchive(Long id, ArchiveDTO dto, MultipartFile newImage) throws IOException {
        Archive archive = getById(id);

        archive.setTheme(dto.getTheme());
        archive.setLieu(dto.getLieu());
        archive.setDateDebut(dto.getDateDebut());
        archive.setDateFin(dto.getDateFin());
        archive.setDescription(dto.getDescription());
        archive.setUrlExterne(dto.getUrlExterne());
        archive.setNombreParticipants(dto.getNombreParticipants());
        archive.setNombreAbstracts(dto.getNombreAbstracts());

        if (newImage != null && !newImage.isEmpty()) {
            if (archive.getImagePublicId() != null) {
                cloudinaryService.deleteFile(archive.getImagePublicId());
            }
            java.util.Map<String, String> uploadResult = cloudinaryService.uploadFile(newImage, "archives");
            archive.setImageUrl(uploadResult.get("url"));
            archive.setImagePublicId(uploadResult.get("publicId"));
        }

        return archiveRepository.save(archive);
    }

    @Transactional
    public void supprimerArchive(Long id) {
        Archive archive = getById(id);

        if (archive.getImagePublicId() != null) {
            cloudinaryService.deleteFile(archive.getImagePublicId());
        }

        archiveRepository.delete(archive);
        log.info("Archive supprimée: {}", id);
    }
}

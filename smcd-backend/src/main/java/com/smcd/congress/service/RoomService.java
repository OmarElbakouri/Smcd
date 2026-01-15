package com.smcd.congress.service;

import com.smcd.congress.dto.RoomDTO;
import com.smcd.congress.dto.RoomResponseDTO;
import com.smcd.congress.exception.ResourceNotFoundException;
import com.smcd.congress.model.Room;
import com.smcd.congress.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.Normalizer;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Service pour la gestion des Salles (Rooms)
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final CloudinaryService cloudinaryService;

    /**
     * Génère un slug à partir d'un texte
     */
    private String generateSlug(String text) {
        if (text == null) return "";
        
        // Normalise les caractères accentués
        String normalized = Normalizer.normalize(text.toLowerCase(), Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("");
        
        // Remplace les espaces et caractères spéciaux par des tirets
        slug = slug.replaceAll("[^a-z0-9]", "-");
        
        // Supprime les tirets multiples et en début/fin
        slug = slug.replaceAll("-+", "-").replaceAll("^-|-$", "");
        
        return slug;
    }

    /**
     * Génère un slug unique
     */
    private String generateUniqueSlug(String text) {
        String baseSlug = generateSlug(text);
        String slug = baseSlug;
        int counter = 1;
        
        while (roomRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        
        return slug;
    }

    /**
     * Crée une nouvelle salle
     */
    @Transactional
    public Room creerRoom(RoomDTO dto, MultipartFile image) {
        log.info("Création d'une nouvelle salle : {}", dto.getNom());

        Room room = Room.builder()
                .nom(dto.getNom())
                .nomCourt(dto.getNomCourt())
                .slug(generateUniqueSlug(dto.getNom()))
                .description(dto.getDescription())
                .descriptionCourte(dto.getDescriptionCourte())
                .couleur(dto.getCouleur())
                .icone(dto.getIcone())
                .annee(dto.getAnnee() != null ? dto.getAnnee() : 2026)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();

        // Déterminer l'ordre
        Integer maxOrdre = roomRepository.findMaxOrdreByAnnee(room.getAnnee());
        room.setOrdre(maxOrdre + 1);

        // Upload image si fournie
        if (image != null && !image.isEmpty()) {
            try {
                Map<String, String> uploadResult = cloudinaryService.uploadFile(
                        image, 
                        "rooms/" + room.getAnnee()
                );
                room.setImageUrl(uploadResult.get("url"));
                room.setImagePublicId(uploadResult.get("publicId"));
                log.info("Image uploadée pour la salle : {}", uploadResult.get("url"));
            } catch (Exception e) {
                log.error("Erreur lors de l'upload de l'image de la salle", e);
            }
        }

        Room savedRoom = roomRepository.save(room);
        log.info("Salle créée avec l'ID : {}", savedRoom.getId());
        
        return savedRoom;
    }

    /**
     * Modifie une salle existante
     */
    @Transactional
    public Room modifierRoom(Long id, RoomDTO dto, MultipartFile newImage) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + id));

        log.info("Modification de la salle ID {} : {}", id, dto.getNom());

        // Mise à jour des champs
        room.setNom(dto.getNom());
        room.setNomCourt(dto.getNomCourt());
        room.setDescription(dto.getDescription());
        room.setDescriptionCourte(dto.getDescriptionCourte());
        room.setCouleur(dto.getCouleur());
        room.setIcone(dto.getIcone());
        if (dto.getActive() != null) room.setActive(dto.getActive());

        // Upload nouvelle image si fournie
        if (newImage != null && !newImage.isEmpty()) {
            try {
                // Supprimer l'ancienne image
                if (room.getImagePublicId() != null) {
                    cloudinaryService.deleteFile(room.getImagePublicId());
                }

                // Upload nouvelle image
                Map<String, String> uploadResult = cloudinaryService.uploadFile(
                        newImage, 
                        "rooms/" + room.getAnnee()
                );
                room.setImageUrl(uploadResult.get("url"));
                room.setImagePublicId(uploadResult.get("publicId"));
                log.info("Nouvelle image uploadée pour la salle : {}", uploadResult.get("url"));
            } catch (Exception e) {
                log.error("Erreur lors de l'upload de la nouvelle image", e);
            }
        }

        return roomRepository.save(room);
    }

    /**
     * Supprime une salle
     */
    @Transactional
    public void supprimerRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + id));

        // Vérifier si la salle contient des chapitres
        if (room.getChapters() != null && !room.getChapters().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer une salle contenant des chapitres. Supprimez d'abord les chapitres.");
        }

        log.info("Suppression de la salle ID {} : {}", id, room.getNom());

        // Supprimer l'image de Cloudinary
        if (room.getImagePublicId() != null) {
            try {
                cloudinaryService.deleteFile(room.getImagePublicId());
            } catch (Exception e) {
                log.error("Erreur lors de la suppression de l'image", e);
            }
        }

        roomRepository.delete(room);
    }

    /**
     * Réordonne les salles
     */
    @Transactional
    public void reordonnerRooms(List<Long> idsOrdre) {
        log.info("Réordonnancement des salles : {}", idsOrdre);
        
        for (int i = 0; i < idsOrdre.size(); i++) {
            Long roomId = idsOrdre.get(i);
            roomRepository.findById(roomId).ifPresent(room -> {
                room.setOrdre(idsOrdre.indexOf(roomId) + 1);
                roomRepository.save(room);
            });
        }
    }

    /**
     * Récupère les salles publiques
     */
    @Transactional(readOnly = true)
    public List<RoomResponseDTO> getRoomsPubliques(Integer annee) {
        Integer targetAnnee = annee != null ? annee : 2026;
        List<Room> rooms = roomRepository.findByActiveTrueAndAnneeOrderByOrdreAsc(targetAnnee);
        return rooms.stream()
                .map(RoomResponseDTO::fromRoom)
                .toList();
    }

    /**
     * Récupère toutes les salles (admin)
     */
    @Transactional(readOnly = true)
    public List<RoomResponseDTO> getAllRooms(Integer annee) {
        Integer targetAnnee = annee != null ? annee : 2026;
        List<Room> rooms = roomRepository.findByAnneeOrderByOrdreAsc(targetAnnee);
        return rooms.stream()
                .map(RoomResponseDTO::fromRoom)
                .toList();
    }

    /**
     * Récupère une salle par son slug avec ses chapitres
     */
    @Transactional(readOnly = true)
    public RoomResponseDTO getRoomBySlug(String slug) {
        Room room = roomRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec le slug : " + slug));
        return RoomResponseDTO.fromRoomWithChapters(room);
    }

    /**
     * Récupère une salle par son ID
     */
    @Transactional(readOnly = true)
    public RoomResponseDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + id));
        return RoomResponseDTO.fromRoom(room);
    }

    /**
     * Active ou désactive une salle
     */
    @Transactional
    public Room toggleActive(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salle non trouvée avec l'ID : " + id));
        
        room.setActive(!room.getActive());
        log.info("Salle {} {} ", room.getNom(), room.getActive() ? "activée" : "désactivée");
        
        return roomRepository.save(room);
    }

    /**
     * Compte le nombre de salles
     */
    @Transactional(readOnly = true)
    public Long countRooms(Integer annee) {
        return roomRepository.countByAnnee(annee != null ? annee : 2026);
    }
}

package com.smcd.congress.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service pour la gestion des fichiers avec Cloudinary
 * Gère l'upload et la suppression de fichiers (images, vidéos, PDFs)
 */
@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    @Autowired
    private Cloudinary cloudinary;

    /**
     * Upload un fichier vers Cloudinary (retourne URL et publicId)
     * 
     * @param file Le fichier à uploader
     * @param folder Le dossier de destination (ex: "abstracts", "videos", "posters")
     * @return Map contenant "url" et "publicId"
     * @throws IOException Si une erreur survient pendant l'upload
     */
    public Map<String, String> uploadFile(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier ne peut pas être vide");
        }

        try {
            // Configurer les options d'upload
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", "smcd-congress/" + folder,
                    "resource_type", "auto" // Détecte automatiquement le type (image, video, raw)
            );

            // Uploader le fichier
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            // Récupérer l'URL sécurisée et le publicId
            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            logger.info("Fichier uploadé avec succès: {} -> {}", file.getOriginalFilename(), publicId);

            return Map.of("url", secureUrl, "publicId", publicId);

        } catch (IOException e) {
            logger.error("Erreur lors de l'upload du fichier: {}", e.getMessage());
            throw new IOException("Erreur lors de l'upload du fichier vers Cloudinary", e);
        }
    }

    /**
     * Upload un fichier raw (PDF, Word, etc.) vers Cloudinary
     * 
     * @param file Le fichier MultipartFile à uploader
     * @param folder Le dossier de destination
     * @return Map contenant "url" et "publicId"
     * @throws IOException Si une erreur survient pendant l'upload
     */
    public Map<String, String> uploadRawFile(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier ne peut pas être vide");
        }

        try {
            // Configurer les options d'upload pour les fichiers raw (PDF, Word, etc.)
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", "smcd-congress/" + folder,
                    "resource_type", "raw" // Force le type raw pour les documents
            );

            // Uploader le fichier
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            // Récupérer l'URL sécurisée et le publicId
            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            logger.info("Fichier raw uploadé avec succès: {} -> {}", file.getOriginalFilename(), publicId);

            return Map.of("url", secureUrl, "publicId", publicId);

        } catch (IOException e) {
            logger.error("Erreur lors de l'upload du fichier raw: {}", e.getMessage());
            throw new IOException("Erreur lors de l'upload du fichier vers Cloudinary", e);
        }
    }

    /**
     * Upload un fichier (File) vers Cloudinary
     * 
     * @param file Le fichier à uploader
     * @param folder Le dossier de destination
     * @return L'URL publique du fichier uploadé
     * @throws IOException Si une erreur survient pendant l'upload
     */
    public String uploadFile(java.io.File file, String folder) throws IOException {
        if (file == null || !file.exists()) {
            throw new IllegalArgumentException("Le fichier ne peut pas être vide ou inexistant");
        }

        try {
            // Configurer les options d'upload
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", "smcd-congress/" + folder,
                    "resource_type", "raw" // Pour les fichiers Word/PDF
            );

            // Uploader le fichier
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file, options);

            // Récupérer l'URL sécurisée
            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            logger.info("Fichier uploadé avec succès: {} -> {}", file.getName(), publicId);

            return secureUrl;

        } catch (IOException e) {
            logger.error("Erreur lors de l'upload du fichier: {}", e.getMessage());
            throw new IOException("Erreur lors de l'upload du fichier vers Cloudinary", e);
        }
    }

    /**
     * Upload un fichier (File) vers Cloudinary avec nom personnalisé
     * 
     * @param file Le fichier à uploader
     * @param folder Le dossier de destination
     * @param publicId Le nom personnalisé du fichier (sans extension)
     * @return L'URL publique du fichier uploadé
     * @throws IOException Si une erreur survient pendant l'upload
     */
    public String uploadFileWithName(java.io.File file, String folder, String publicId) throws IOException {
        if (file == null || !file.exists()) {
            throw new IllegalArgumentException("Le fichier ne peut pas être vide ou inexistant");
        }

        try {
            // Configurer les options d'upload avec public_id personnalisé
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", "smcd-congress/" + folder,
                    "public_id", publicId,
                    "resource_type", "raw",
                    "use_filename", false,
                    "unique_filename", false
            );

            // Uploader le fichier
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file, options);

            // Récupérer l'URL sécurisée
            String secureUrl = (String) uploadResult.get("secure_url");

            logger.info("Fichier uploadé avec nom personnalisé: {} -> {}", publicId, secureUrl);

            return secureUrl;

        } catch (IOException e) {
            logger.error("Erreur lors de l'upload du fichier avec nom personnalisé: {}", e.getMessage());
            throw new IOException("Erreur lors de l'upload du fichier vers Cloudinary", e);
        }
    }

    /**
     * Supprime un fichier de Cloudinary
     * 
     * @param publicId L'identifiant public du fichier (ex: "smcd-congress/abstracts/abc123")
     * @return true si la suppression a réussi, false sinon
     */
    public boolean deleteFile(String publicId) {
        if (publicId == null || publicId.isEmpty()) {
            throw new IllegalArgumentException("Le publicId ne peut pas être vide");
        }

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

            String status = (String) result.get("result");
            boolean success = "ok".equals(status);

            if (success) {
                logger.info("Fichier supprimé avec succès: {}", publicId);
            } else {
                logger.warn("Échec de la suppression du fichier: {} - Status: {}", publicId, status);
            }

            return success;

        } catch (IOException e) {
            logger.error("Erreur lors de la suppression du fichier: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Extrait le publicId d'une URL Cloudinary
     * 
     * @param url L'URL complète du fichier
     * @return Le publicId extrait
     */
    public String extractPublicIdFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }

        // Format: https://res.cloudinary.com/{cloud_name}/image/upload/v123/folder/filename.ext
        // On veut extraire: folder/filename (sans extension)
        try {
            String[] parts = url.split("/upload/");
            if (parts.length > 1) {
                String pathWithVersion = parts[1];
                // Retirer le numéro de version (v123456/)
                String path = pathWithVersion.replaceFirst("v\\d+/", "");
                // Retirer l'extension
                int lastDot = path.lastIndexOf('.');
                if (lastDot > 0) {
                    return path.substring(0, lastDot);
                }
                return path;
            }
        } catch (Exception e) {
            logger.error("Erreur lors de l'extraction du publicId: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Upload une vidéo vers Cloudinary
     * 
     * @param file Le fichier vidéo
     * @param folder Le dossier de destination
     * @return Map contenant "url", "publicId", et optionnellement "duration"
     * @throws IOException Si une erreur survient
     */
    public Map<String, String> uploadVideo(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier vidéo ne peut pas être vide");
        }

        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", "smcd-congress/" + folder,
                    "resource_type", "video"
                    // Retirer eager qui cause des problèmes de cast
            );

            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");
            
            java.util.HashMap<String, String> result = new java.util.HashMap<>();
            result.put("url", secureUrl);
            result.put("publicId", publicId);
            
            // Récupérer la durée si disponible
            Object durationObj = uploadResult.get("duration");
            if (durationObj != null) {
                result.put("duration", String.valueOf(((Number) durationObj).intValue()));
            }

            logger.info("Vidéo uploadée: {} -> {} (durée: {}s)", 
                    file.getOriginalFilename(), publicId, durationObj);

            return result;

        } catch (IOException e) {
            logger.error("Erreur upload vidéo: {}", e.getMessage());
            throw new IOException("Erreur upload vidéo vers Cloudinary", e);
        }
    }

    /**
     * Supprime une vidéo de Cloudinary
     * 
     * @param publicId L'identifiant public de la vidéo
     * @return true si succès
     */
    public boolean deleteVideo(String publicId) {
        if (publicId == null || publicId.isEmpty()) {
            return false;
        }

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().destroy(
                    publicId, 
                    ObjectUtils.asMap("resource_type", "video")
            );

            String status = (String) result.get("result");
            boolean success = "ok".equals(status);

            if (success) {
                logger.info("Vidéo supprimée: {}", publicId);
            } else {
                logger.warn("Échec suppression vidéo: {} - {}", publicId, status);
            }

            return success;

        } catch (IOException e) {
            logger.error("Erreur suppression vidéo: {}", e.getMessage());
            return false;
        }
    }
}

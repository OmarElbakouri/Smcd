package com.smcd.congress.service;

import com.smcd.congress.model.Abstract;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.time.format.DateTimeFormatter;

/**
 * Service de génération de documents Word pour les abstracts
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class WordGeneratorService {

    private final CloudinaryService cloudinaryService;

    private static final String FONT_NAME = "Times New Roman";
    private static final int FONT_SIZE_TITLE = 16;
    private static final int FONT_SIZE_SECTION = 12;
    private static final int FONT_SIZE_CONTENT = 11;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy à HH:mm");

    /**
     * Génère un document Word à partir d'un abstract et l'upload sur Cloudinary
     * 
     * @param abstractEntity L'abstract à convertir en document Word
     * @return L'URL Cloudinary du document généré
     */
    public String generateAbstractDocument(Abstract abstractEntity) {
        log.info("Génération du document Word pour l'abstract: {}", abstractEntity.getNumeroReference());

        File tempFile = null;
        try {
            // Créer le document Word
            XWPFDocument document = new XWPFDocument();

            // Créer l'en-tête
            createHeader(document, abstractEntity);

            // Créer le titre
            createTitle(document, abstractEntity.getTitre());

            // Créer les mots-clés si présents
            if (abstractEntity.getMotsCles() != null && !abstractEntity.getMotsCles().isEmpty()) {
                createKeywords(document, abstractEntity.getMotsCles());
            }

            // Créer les sections
            createSection(document, "Introduction", abstractEntity.getIntroduction());
            createSection(document, "Matériel et méthodes", abstractEntity.getMaterielMethodes());
            createSection(document, "Résultats", abstractEntity.getResultats());
            createSection(document, "Discussion", abstractEntity.getDiscussion());
            createSection(document, "Conclusion", abstractEntity.getConclusion());

            // Références si présentes
            if (abstractEntity.getReferences() != null && !abstractEntity.getReferences().isEmpty()) {
                createSection(document, "Références", abstractEntity.getReferences());
            }

            // Créer le pied de page
            createFooter(document, abstractEntity);

            // Générer le nom du fichier
            String fileName = generateFileName(abstractEntity);
            
            // Sauvegarder temporairement
            tempFile = File.createTempFile("abstract_", ".docx");
            
            try (FileOutputStream out = new FileOutputStream(tempFile)) {
                document.write(out);
            }
            document.close();

            // Upload vers Cloudinary avec nom personnalisé (sans .docx, Cloudinary l'ajoute automatiquement)
            String publicIdName = fileName.replace(".docx", "");
            String cloudinaryUrl = cloudinaryService.uploadFileWithName(tempFile, "abstracts/2026", publicIdName);
            log.info("Document Word uploadé avec succès: {}", cloudinaryUrl);

            return cloudinaryUrl;

        } catch (IOException e) {
            log.error("Erreur lors de la génération du document Word", e);
            throw new RuntimeException("Erreur lors de la génération du document Word: " + e.getMessage());
        } finally {
            // Nettoyer le fichier temporaire
            if (tempFile != null && tempFile.exists()) {
                try {
                    Files.delete(tempFile.toPath());
                } catch (IOException e) {
                    log.warn("Impossible de supprimer le fichier temporaire: {}", tempFile.getAbsolutePath());
                }
            }
        }
    }

    /**
     * Crée l'en-tête du document
     */
    private void createHeader(XWPFDocument document, Abstract abstractEntity) {
        // Titre du congrès
        XWPFParagraph titlePara = document.createParagraph();
        titlePara.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun titleRun = titlePara.createRun();
        titleRun.setText("CONGRÈS NATIONAL DE CHIRURGIE DIGESTIVE 2026");
        titleRun.setBold(true);
        titleRun.setFontSize(14);
        titleRun.setFontFamily(FONT_NAME);
        titleRun.setColor("1E40AF"); // Bleu

        // Sous-titre
        XWPFParagraph subTitlePara = document.createParagraph();
        subTitlePara.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun subTitleRun = subTitlePara.createRun();
        subTitleRun.setText("Société Marocaine de Chirurgie Digestive (SMCD)");
        subTitleRun.setItalic(true);
        subTitleRun.setFontSize(FONT_SIZE_CONTENT);
        subTitleRun.setFontFamily(FONT_NAME);

        // Ligne de séparation
        addSeparator(document);

        // Informations de l'auteur
        createInfoLine(document, "Auteur principal", abstractEntity.getPrenom() + " " + abstractEntity.getNom());
        createInfoLine(document, "Email", abstractEntity.getEmail());
        if (abstractEntity.getTelephone() != null && !abstractEntity.getTelephone().isEmpty()) {
            createInfoLine(document, "Téléphone", abstractEntity.getTelephone());
        }
        createInfoLine(document, "Auteurs", abstractEntity.getAuteurs());
        createInfoLine(document, "Affiliation", abstractEntity.getAffiliation());
        createInfoLine(document, "Rubrique", abstractEntity.getRubrique().getLabel());
        createInfoLine(document, "Type de communication", abstractEntity.getType().getLabel());
        createInfoLine(document, "Numéro de référence", abstractEntity.getNumeroReference());
        
        if (abstractEntity.getDateSoumission() != null) {
            createInfoLine(document, "Date de soumission", abstractEntity.getDateSoumission().format(DATE_FORMATTER));
        }

        // Ligne de séparation
        addSeparator(document);

        // Espace
        document.createParagraph();
    }

    /**
     * Crée une ligne d'information (label: valeur)
     */
    private void createInfoLine(XWPFDocument document, String label, String value) {
        XWPFParagraph para = document.createParagraph();
        para.setSpacingBetween(1.15);
        
        XWPFRun labelRun = para.createRun();
        labelRun.setText(label + " : ");
        labelRun.setBold(true);
        labelRun.setFontSize(FONT_SIZE_CONTENT);
        labelRun.setFontFamily(FONT_NAME);

        XWPFRun valueRun = para.createRun();
        valueRun.setText(value);
        valueRun.setFontSize(FONT_SIZE_CONTENT);
        valueRun.setFontFamily(FONT_NAME);
    }

    /**
     * Crée le titre de l'abstract
     */
    private void createTitle(XWPFDocument document, String titre) {
        XWPFParagraph titlePara = document.createParagraph();
        titlePara.setAlignment(ParagraphAlignment.CENTER);
        titlePara.setSpacingAfter(400);
        
        XWPFRun titleRun = titlePara.createRun();
        titleRun.setText(titre.toUpperCase());
        titleRun.setBold(true);
        titleRun.setFontSize(FONT_SIZE_TITLE);
        titleRun.setFontFamily(FONT_NAME);
    }

    /**
     * Crée la section des mots-clés
     */
    private void createKeywords(XWPFDocument document, String motsCles) {
        XWPFParagraph keywordPara = document.createParagraph();
        keywordPara.setAlignment(ParagraphAlignment.LEFT);
        keywordPara.setSpacingAfter(200);

        XWPFRun labelRun = keywordPara.createRun();
        labelRun.setText("Mots-clés : ");
        labelRun.setBold(true);
        labelRun.setItalic(true);
        labelRun.setFontSize(FONT_SIZE_CONTENT);
        labelRun.setFontFamily(FONT_NAME);

        XWPFRun valueRun = keywordPara.createRun();
        valueRun.setText(motsCles);
        valueRun.setItalic(true);
        valueRun.setFontSize(FONT_SIZE_CONTENT);
        valueRun.setFontFamily(FONT_NAME);

        // Espace après
        document.createParagraph();
    }

    /**
     * Crée une section avec titre et contenu
     */
    private void createSection(XWPFDocument document, String sectionTitle, String content) {
        // Titre de section
        XWPFParagraph titlePara = document.createParagraph();
        titlePara.setSpacingBefore(200);
        
        XWPFRun titleRun = titlePara.createRun();
        titleRun.setText(sectionTitle);
        titleRun.setBold(true);
        titleRun.setFontSize(FONT_SIZE_SECTION);
        titleRun.setFontFamily(FONT_NAME);

        // Contenu
        XWPFParagraph contentPara = document.createParagraph();
        contentPara.setAlignment(ParagraphAlignment.BOTH);
        contentPara.setSpacingBetween(1.5);
        contentPara.setIndentationFirstLine(720); // Indentation première ligne
        
        XWPFRun contentRun = contentPara.createRun();
        contentRun.setText(content);
        contentRun.setFontSize(FONT_SIZE_CONTENT);
        contentRun.setFontFamily(FONT_NAME);
    }

    /**
     * Crée le pied de page
     */
    private void createFooter(XWPFDocument document, Abstract abstractEntity) {
        // Espace avant le footer
        document.createParagraph();
        
        addSeparator(document);

        // Informations du footer
        XWPFParagraph footerPara = document.createParagraph();
        footerPara.setAlignment(ParagraphAlignment.CENTER);
        
        XWPFRun footerRun = footerPara.createRun();
        footerRun.setText("Référence : " + abstractEntity.getNumeroReference());
        footerRun.setFontSize(10);
        footerRun.setFontFamily(FONT_NAME);
        footerRun.setColor("666666");

        XWPFParagraph statusPara = document.createParagraph();
        statusPara.setAlignment(ParagraphAlignment.CENTER);
        
        XWPFRun statusRun = statusPara.createRun();
        statusRun.setText("Statut : " + abstractEntity.getStatut().getLabel());
        statusRun.setFontSize(10);
        statusRun.setFontFamily(FONT_NAME);
        statusRun.setColor("666666");

        XWPFParagraph genPara = document.createParagraph();
        genPara.setAlignment(ParagraphAlignment.CENTER);
        
        XWPFRun genRun = genPara.createRun();
        genRun.setText("Document généré automatiquement - SMCD 2026");
        genRun.setItalic(true);
        genRun.setFontSize(9);
        genRun.setFontFamily(FONT_NAME);
        genRun.setColor("999999");
    }

    /**
     * Ajoute une ligne de séparation
     */
    private void addSeparator(XWPFDocument document) {
        XWPFParagraph para = document.createParagraph();
        para.setBorderBottom(Borders.SINGLE);
    }

    /**
     * Génère le nom du fichier
     */
    private String generateFileName(Abstract abstractEntity) {
        String titreClean = abstractEntity.getTitre()
                .replaceAll("[^a-zA-Z0-9\\s]", "")
                .replaceAll("\\s+", "_")
                .substring(0, Math.min(30, abstractEntity.getTitre().length()));
        
        return String.format("SMCD2026_%s_%s.docx", 
                abstractEntity.getNumeroReference().replace("SMCD2026-", ""),
                titreClean);
    }
}

package com.smcd.congress.dto;

import com.smcd.congress.model.Sponsor;
import com.smcd.congress.model.enums.NiveauSponsor;

import java.time.LocalDateTime;

public class SponsorResponseDTO {
    private Long id;
    private String nom;
    private NiveauSponsor niveau;
    private String niveauDisplayName;
    private String logoUrl;
    private String logoPublicId;
    private String siteWeb;
    private Integer ordre;
    private Integer annee;
    private Boolean active;
    private LocalDateTime datePartenariat;
    private LocalDateTime dateModification;

    public SponsorResponseDTO() {}

    public SponsorResponseDTO(Sponsor sponsor) {
        this.id = sponsor.getId();
        this.nom = sponsor.getNom();
        this.niveau = sponsor.getNiveau();
        this.niveauDisplayName = sponsor.getNiveau().getNom();
        this.logoUrl = sponsor.getLogoUrl();
        this.logoPublicId = sponsor.getLogoPublicId();
        this.siteWeb = sponsor.getSiteWeb();
        this.ordre = sponsor.getOrdre();
        this.annee = sponsor.getAnnee();
        this.active = sponsor.getActive();
        this.datePartenariat = sponsor.getDatePartenariat();
        this.dateModification = sponsor.getDateModification();
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public NiveauSponsor getNiveau() {
        return niveau;
    }

    public void setNiveau(NiveauSponsor niveau) {
        this.niveau = niveau;
    }

    public String getNiveauDisplayName() {
        return niveauDisplayName;
    }

    public void setNiveauDisplayName(String niveauDisplayName) {
        this.niveauDisplayName = niveauDisplayName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getLogoPublicId() {
        return logoPublicId;
    }

    public void setLogoPublicId(String logoPublicId) {
        this.logoPublicId = logoPublicId;
    }

    public String getSiteWeb() {
        return siteWeb;
    }

    public void setSiteWeb(String siteWeb) {
        this.siteWeb = siteWeb;
    }

    public Integer getOrdre() {
        return ordre;
    }

    public void setOrdre(Integer ordre) {
        this.ordre = ordre;
    }

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getDatePartenariat() {
        return datePartenariat;
    }

    public void setDatePartenariat(LocalDateTime datePartenariat) {
        this.datePartenariat = datePartenariat;
    }

    public LocalDateTime getDateModification() {
        return dateModification;
    }

    public void setDateModification(LocalDateTime dateModification) {
        this.dateModification = dateModification;
    }
}

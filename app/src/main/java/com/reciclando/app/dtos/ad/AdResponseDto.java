package com.reciclando.app.dtos.ad;

public class AdResponseDto {
    private String title;
    private String description;
    private String donorName;
    private String donorContact;
    private String donorLocation;
    private String materialCategory;
    private String createdAt;

    public AdResponseDto(String title, String description, String donorName, String donorContact,
            String donorLocation, String materialCategory, String createdAt) {
        this.title = title;
        this.description = description;
        this.donorName = donorName;
        this.donorContact = donorContact;
        this.donorLocation = donorLocation;
        this.materialCategory = materialCategory;
        this.createdAt = createdAt;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getDonorName() {
        return donorName;
    }

    public String getDonorContact() {
        return donorContact;
    }

    public String getDonorLocation() {
        return donorLocation;
    }

    public String getMaterialCategory() {
        return materialCategory;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}

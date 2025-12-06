package com.reciclando.app.dtos.ad;

import java.util.List;
import com.reciclando.app.models.enums.Material;

public class AdResponseDto {
    private long id;
    private String title;
    private String description;
    private String donorName;
    private String donorContact;
    private String donorLocation;
    private List<Material> category;
    private String createdAt;

    public AdResponseDto(Long id, String title, String description, String donorName, String donorContact,
            String donorLocation, List<Material> category, String createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.donorName = donorName;
        this.donorContact = donorContact;
        this.donorLocation = donorLocation;
        this.category = category;
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
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

    public List<Material> getCategory() {
        return category;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}

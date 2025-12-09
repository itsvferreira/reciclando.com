package com.reciclando.app.dtos.ad;

import java.util.List;
import com.reciclando.app.models.enums.Material;

public class AdResponseDTO {
    private long id;
    private String title;
    private String description;
    private String donorName;
    private String donorContact;
    private List<Material> category;
    private String postalCode;
    private String city;
    private String state;
    private String neighborhood;
    private String createdAt;
    private List<String> imagesPath;
    private String status;
    private String contact;
    private String email;
    private String conclusionCode;

    public AdResponseDTO(long id, String title, String description, String donorName, String donorContact,
            List<Material> category, String postalCode, String city, String state, String neighborhood,
            String createdAt, List<String> imagesPath, String status, String contact, String email,
            String conclusionCode) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.donorName = donorName;
        this.donorContact = donorContact;
        this.category = category;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
        this.neighborhood = neighborhood;
        this.createdAt = createdAt;
        this.imagesPath = imagesPath;
        this.status = status;
        this.contact = contact;
        this.email = email;
        this.conclusionCode = conclusionCode;
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

    public List<Material> getCategory() {
        return category;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public List<String> getImagesPath() {
        return imagesPath;
    }

    public String getStatus() {
        return status;
    }

    public String getConclusionCode() {
        return conclusionCode;
    }

    public String getContact() {
        return contact;
    }

    public String getEmail() {
        return email;
    }
}

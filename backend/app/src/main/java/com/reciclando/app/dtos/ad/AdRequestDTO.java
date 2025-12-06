package com.reciclando.app.dtos.ad;

import com.reciclando.app.models.enums.Material;
import java.util.List;

public class AdRequestDTO {
    private String title;
    private String description;
    private Long donorId;
    private List<Material> category;
    private String postalCode;
    private String city;
    private String state;
    private String neighborhood;

    public AdRequestDTO(String title, String description, Long donorId, List<Material> category, String postalCode,
            String city, String state, String neighborhood) {
        this.title = title;
        this.description = description;
        this.donorId = donorId;
        this.category = category;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
        this.neighborhood = neighborhood;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getDonorId() {
        return donorId;
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

}

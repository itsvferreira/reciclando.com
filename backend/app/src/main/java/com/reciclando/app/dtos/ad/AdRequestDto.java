package com.reciclando.app.dtos.ad;

import com.reciclando.app.models.enums.Material;
import java.util.List;

public class AdRequestDto {
    private String title;
    private String description;
    private Long donorId;
    private List<Material> category;

    public AdRequestDto(String title, String description, Long donorId, List<Material> category) {
        this.title = title;
        this.description = description;
        this.donorId = donorId;
        this.category = category;
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
}

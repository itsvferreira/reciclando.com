package com.reciclando.app.dtos.ad;

public class AdRequestDto {
    private String title;
    private String description;
    private Long donorId;
    private String materialCategory;

    public AdRequestDto(String title, String description, Long donorId, String materialCategory) {
        this.title = title;
        this.description = description;
        this.donorId = donorId;
        this.materialCategory = materialCategory;
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

    public String getMaterialCategory() {
        return materialCategory;
    }
}

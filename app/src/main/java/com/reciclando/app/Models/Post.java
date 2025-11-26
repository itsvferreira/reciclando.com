package com.reciclando.app.Models;

import java.time.OffsetDateTime;

import com.reciclando.app.Models.enums.Material;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String photoPath;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address location;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Donor donor;

    @Enumerated(EnumType.STRING)
    private Material materialCategory;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        createdAt = updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    protected Post() {
    }

    public Post(String title, String description, Donor donor, Material materialCategory) {
        this.title = title;
        this.description = description;
        this.donor = donor;
        this.materialCategory = materialCategory;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public Address getLocation() {
        return location;
    }

    public void setLocation(Address location) {
        this.location = location;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public Material getMaterialCategory() {
        return materialCategory;
    }

    public void setMaterialCategory(Material materialCategory) {
        this.materialCategory = materialCategory;
    }

    @Override
    public String toString() {
        return "Post [id=" + id + ", title=" + title + ", description=" + description + ", photoPath=" + photoPath
                + ", location=" + location + ", donor=" + donor + ", materialCategory=" + materialCategory
                + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}

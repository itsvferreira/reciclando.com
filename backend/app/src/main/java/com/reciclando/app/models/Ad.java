package com.reciclando.app.models;

import java.time.LocalDateTime;
import java.util.List;

import com.reciclando.app.models.enums.Material;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "ads")
public class Ad {
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
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ad_categories", joinColumns = @JoinColumn(name = "ad_id"))
    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private List<Material> category;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    protected Ad() {
    }

    public Ad(String title, String description, Donor donor, List<Material> category) {
        this.title = title;
        this.description = description;
        this.donor = donor;
        this.category = category;
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

    public List<Material> getCategory() {
        return category;
    }

    public void setCategory(List<Material> category) {
        this.category = category;
    }

    public String getFormatedCreationDate() {
        String fullDate = createdAt.toString();
        return fullDate.substring(0, 10) + ", " + fullDate.substring(11, 16);
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getLocationString() {
        return buildLocationString();
    }

    private String buildLocationString() {
        if (donor.getAddress() != null) {
            String city = donor.getAddress().getCity();
            String state = donor.getAddress().getState();
            return city + " - " + state;
        }
        return "No address provided";
    }

    @Override
    public String toString() {
        return "Post [id=" + id + ", title=" + title + ", description=" + description + ", photoPath=" + photoPath
                + ", location=" + location + ", donor=" + donor + ", category=" + category
                + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}

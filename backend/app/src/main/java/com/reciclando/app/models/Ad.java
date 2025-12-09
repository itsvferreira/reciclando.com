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
    private List<String> imagesPath;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ad_categories", joinColumns = @JoinColumn(name = "ad_id"))
    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private List<Material> category;

    private String status;
    private String conclusionCode;
    private String contact;
    private String email;
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

    public Ad(String title, String description, Donor donor, List<Material> category, Address address) {
        this.title = title;
        this.description = description;
        this.donor = donor;
        this.category = category;
        this.address = address;
        this.status = "active";
        this.contact = donor.getContact();
        this.email = donor.getEmail();
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

    public List<String> getImagesPath() {
        return imagesPath;
    }

    public void setImagesPath(List<String> imagesPath) {
        this.imagesPath = imagesPath;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
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

    public String getConclusionCode() {
        return conclusionCode;
    }

    public void setConclusionCode(String conclusionCode) {
        this.conclusionCode = conclusionCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getCity() {
        return address.getCity();
    }

    public String getPostalCode() {
        return address.getPostalCode();
    }

    public String getState() {
        return address.getState();
    }

    public String getNeighborhood() {
        return address.getNeighborhood();
    }

    public String getPhone() {
        return contact;
    }

    public void setPhone(String contact) {
        this.contact = donor.getContact();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = donor.getEmail();
    }

    @Override
    public String toString() {
        return "Ad [id=" + id + ", title=" + title + ", description=" + description + ", imagesPath=" + imagesPath
                + ", address=" + address + ", donor=" + donor + ", category=" + category + ", status=" + status
                + ", conclusionCode=" + conclusionCode + ", contact=" + contact + ", email="
                + email + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}

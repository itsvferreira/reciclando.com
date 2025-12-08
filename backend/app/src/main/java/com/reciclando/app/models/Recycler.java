package com.reciclando.app.models;

import java.util.List;

import com.reciclando.app.models.enums.Material;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recyclers")
public class Recycler {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "recycler_materials", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "material")
    @Enumerated(EnumType.STRING)
    private List<Material> acceptedMaterials;

    @Column(name = "code")
    private String code;

    protected Recycler() {
    }

    public Recycler(User user, List<Material> acceptedMaterials) {
        this.user = user;
        this.acceptedMaterials = acceptedMaterials;
    }

    public User getUser() {
        return user;
    }

    public Long getUserId() {
        return userId;
    }

    public List<Material> getAcceptedMaterials() {
        return acceptedMaterials;
    }

    public void setAcceptedMaterials(List<Material> acceptedMaterials) {
        this.acceptedMaterials = acceptedMaterials;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "Recycler [userId=" + userId + ", user=" + user + ", acceptedMaterials=" + acceptedMaterials + "]";
    }
}

package com.reciclando.app.Models;

import java.util.List;

import com.reciclando.app.Models.enums.Material;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.ElementCollection;

@Entity
@Table(name = "recyclers")
public class Recycler {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Material> acceptedMaterials;

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

    @Override
    public String toString() {
        return "Recycler [userId=" + userId + ", user=" + user + ", acceptedMaterials=" + acceptedMaterials + "]";
    }
}

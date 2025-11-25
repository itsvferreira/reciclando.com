package com.reciclando.app.Models;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recyclers")
public class Recycler {
    
    @Id
    private Long id;

    @OneToOne
    @MapsId
    private User user;

    private String availability;

    @ManyToMany
    @JoinTable(
        name = "recycler_materials",
        joinColumns = @JoinColumn(name = "recycler_id"),
        inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materials;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}

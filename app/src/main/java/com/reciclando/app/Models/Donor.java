package com.reciclando.app.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "donors")
public class Donor {
    
    @Id
    private Long id;

    @OneToMany
    @MapsId
    private User user;
}

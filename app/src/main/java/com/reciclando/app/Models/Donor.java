package com.reciclando.app.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "donors")
public class Donor {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    protected Donor() {
    }

    public Donor(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId;
    }

    public User getUser() {
        return user;
    }
}

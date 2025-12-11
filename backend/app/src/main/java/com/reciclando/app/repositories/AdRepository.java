package com.reciclando.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Ad;
import com.reciclando.app.models.Donor;

public interface AdRepository extends CrudRepository<Ad, Long> {
    List<Ad> findAllByOrderByCreatedAtDesc();

    List<Ad> findByDonorOrderByCreatedAtDesc(Donor donor);

    @Query("SELECT a FROM Ad a WHERE a.address.city = :city")
    List<Ad> findByCity(String city);

    @Query("SELECT a FROM Ad a WHERE a.address.city = :city AND a.address.neighborhood = :neighboorhood")
    List<Ad> findByCityAndNeighboorhood(String city, String neighboorhood);
}

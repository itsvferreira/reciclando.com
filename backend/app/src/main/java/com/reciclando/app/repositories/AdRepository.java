package com.reciclando.app.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Ad;
import com.reciclando.app.models.Donor;

public interface AdRepository extends CrudRepository<Ad, Long> {
    List<Ad> findAllByOrderByCreatedAtDesc();
    List<Ad> findByDonorOrderByCreatedAtDesc(Donor donor);
}

package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Ad;

public interface AdRepository extends CrudRepository<Ad, Long> {
    List<Ad> findAllByOrderByCreatedAtDesc();
}

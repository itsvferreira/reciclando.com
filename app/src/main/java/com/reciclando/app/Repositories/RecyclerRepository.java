package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reciclando.app.Models.Recycler;

@Repository
public interface RecyclerRepository extends JpaRepository<Recycler, Long> {
    List<Recycler> findByAcceptedMaterialsContaining(String material);
}
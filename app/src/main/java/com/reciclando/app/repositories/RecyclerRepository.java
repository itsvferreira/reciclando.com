package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Recycler;

public interface RecyclerRepository extends CrudRepository<Recycler, Long> {
    List<Recycler> findByAcceptedMaterialsContaining(String material);
    
}

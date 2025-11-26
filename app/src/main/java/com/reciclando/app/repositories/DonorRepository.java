package com.reciclando.app.repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Donor;

public interface DonorRepository extends CrudRepository<Donor, Long> {
    
}

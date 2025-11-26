package com.reciclando.app.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Donor;

public interface DonorRepository extends CrudRepository<Donor, Long> {
    
}

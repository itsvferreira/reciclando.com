package com.reciclando.app.services;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Donor;

public interface DonorService extends CrudRepository<Donor, Long> {

}

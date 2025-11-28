package com.reciclando.app.Services;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Donor;

public interface DonorService extends CrudRepository<Donor, Long> {

}

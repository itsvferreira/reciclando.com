package com.reciclando.app.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
    
}

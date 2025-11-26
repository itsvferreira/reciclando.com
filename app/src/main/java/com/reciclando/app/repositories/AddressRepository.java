package com.reciclando.app.repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
    
}

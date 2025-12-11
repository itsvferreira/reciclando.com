package com.reciclando.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
    Address findByPostalCode(String postalCode);

    @Query("SELECT DISTINCT city FROM Address")
    List<String> getCities();

    @Query("SELECT DISTINCT neighborhood FROM Address WHERE city = :city")
    List<String> getNeighborhoods(String city);
}

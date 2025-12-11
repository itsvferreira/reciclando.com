package com.reciclando.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reciclando.app.repositories.AddressRepository;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Transactional(readOnly = true)
    public List<String> getAllCities() {
        return addressRepository.getCities();
    }

    @Transactional(readOnly = true)
    public List<String> getAllNeighboorhoods(String city) {
        return addressRepository.getNeighborhoods(city);
    }
}

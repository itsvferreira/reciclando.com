package com.reciclando.app.controllers.v1;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.reciclando.app.services.AddressService;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        try {
            var citiesList = addressService.getAllCities();
            return ResponseEntity.ok().body(citiesList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/neighborhoods")
    public ResponseEntity<List<String>> getAllNeighboorhoodsByCity(@RequestParam String city) {
        try {
            var neighboorhoodsList = addressService.getAllNeighboorhoods(city);
            return ResponseEntity.ok().body(neighboorhoodsList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

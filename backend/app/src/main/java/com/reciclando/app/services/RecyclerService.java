package com.reciclando.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.User;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.repositories.RecyclerRepository;
import com.reciclando.app.repositories.UserRepository;

@Service
public class RecyclerService {

    private final RecyclerRepository recyclerRepository;
    private final UserRepository userRepository;

    public RecyclerService(RecyclerRepository recyclerRepository, UserRepository userRepository) {
        this.recyclerRepository = recyclerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Recycler createRecycler(Long userId, List<Material> acceptedMaterials) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (recyclerRepository.existsById(userId)) {
            throw new IllegalArgumentException("Recycler already exists for user id: " + userId);
        }

        Recycler recycler = new Recycler(user, acceptedMaterials);
        return recyclerRepository.save(recycler);
    }

    @Transactional
    public Recycler updateMaterials(Long userID, List<Material> newMaterials){
        Recycler recycler = recyclerRepository.findById(userID)
            .orElseThrow(() -> new IllegalArgumentException("Recycler not found with user id: " + userID));
        recycler.setAcceptedMaterials(newMaterials);
        return recyclerRepository.save(recycler);
    }

    public Recycler getByUserID(Long userId) {
        return recyclerRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Recycler not found with user id: " + userId));
    }

    public List<Recycler> getAll(){
        return recyclerRepository.findAll();
    }

    @Transactional
    public void deleteRecycler(Long userID){
        if (!recyclerRepository.existsById(userID)) {
            throw new IllegalArgumentException("Recycler not found with user id: " + userID);
        }
        recyclerRepository.deleteById(userID);
    }

    public List<Recycler> findByAcceptedMaterial(Material material) {
        return recyclerRepository.findByAcceptedMaterialsContaining(material);
    }

    public List<Recycler> findByCity(String city) {
        return recyclerRepository.findByCity(city);
    }

    public List<Recycler> findByCityAndMaterial(String city, Material material) {
        return recyclerRepository.findByCityAndMaterial(city, material);
    }

    public List<Recycler> search(String city, Material material) {
        if (city != null && material != null) {
            return findByCityAndMaterial(city, material);
        }
        if (city != null) return findByCity(city);
        if (material != null) return findByAcceptedMaterial(material);
        return getAll();
    }
}
package com.reciclando.app.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.User;
import com.reciclando.app.Models.enums.Material;
import com.reciclando.app.Repositories.RecyclerRepository;
import com.reciclando.app.Repositories.UserRepository;

public class RecyclerService {

    private final RecyclerRepository recyclerRepository;
    private final UserRepository userRepository;

    public RecyclerService(RecyclerRepository recyclerRepository, UserRepository userRepository) {
        this.recyclerRepository = recyclerRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public Recycler registerRecycler(Long userId, List<Material> acceptedMaterials) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }
        if (recyclerRepository.existsById(userId)) {
            throw new IllegalArgumentException("Recycler already registered for user id: " + userId);
        }
        User user = userOpt.get();
        Recycler recycler = new Recycler(user, acceptedMaterials);
        return recyclerRepository.save(recycler);
    }

    @Transactional
    public void updateMaterials(Long userID, List<Material> newMaterials){
        Recycler recycler = recyclerRepository.findById(userID)
            .orElseThrow(() -> new IllegalArgumentException("Recycler not found with user id: " + userID));
        recycler.setAcceptedMaterials(newMaterials);
    }

    public Recycler getByUserID(Long userID){
        return recyclerRepository.findById(userID)
            .orElseThrow(() -> new IllegalArgumentException("Recycler not found with user id: " + userID));
    }

    public List<Recycler> getAll(){
        return (List<Recycler>) recyclerRepository.findAll();
    }

    @Transactional
    public void deleteRecycler(Long userID){
        if (!recyclerRepository.existsById(userID)) {
            throw new IllegalArgumentException("Recycler not found with user id: " + userID);
        }
        recyclerRepository.deleteById(userID);
    }

    public List<Recycler> findByAcceptedMaterial(Material material){
        return recyclerRepository.findByAcceptedMaterialsContaining(material.name());
    }


}

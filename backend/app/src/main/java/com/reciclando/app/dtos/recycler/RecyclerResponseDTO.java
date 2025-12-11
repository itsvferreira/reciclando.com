package com.reciclando.app.dtos.recycler;

import java.util.List;

import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.enums.Material;

public record RecyclerResponseDTO(
    Long userId,
    String firstName,
    String lastName,
    String email,
    String phone,
    String city,
    String state,
    String street,
    String neighborhood,
    String aboutMe,
    String code,
    List<Material> acceptedMaterials
) {
    public static RecyclerResponseDTO fromRecycler(Recycler recycler) {
        String city = null;
        String state = null;
        String street = null;
        String neighborhood = null;
        
        if (recycler.getUser().getAddress() != null) {
            city = recycler.getUser().getAddress().getCity();
            state = recycler.getUser().getAddress().getState();
            street = recycler.getUser().getAddress().getState();
            neighborhood = recycler.getUser().getAddress().getNeighborhood();
        }
        
        return new RecyclerResponseDTO(
            recycler.getUserId(),
            recycler.getUser().getFirstName(),
            recycler.getUser().getLastName(),
            recycler.getUser().getEmail(),
            recycler.getUser().getPhone(),
            city,
            state,
            street,
            neighborhood,
            recycler.getAboutMe(),
            recycler.getCode(),
            recycler.getAcceptedMaterials()
        );
    }
}
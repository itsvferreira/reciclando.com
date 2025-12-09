package com.reciclando.app.dtos.recycler;

import java.util.List;

import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.enums.Material;

public record RecyclerResponseDTO(
    Long userId,
    String firstName,
    String lastName,
    String city,
    String state,
    List<Material> acceptedMaterials
) {
    public static RecyclerResponseDTO fromRecycler(Recycler recycler) {
        return new RecyclerResponseDTO(
            recycler.getUserId(),
            recycler.getUser().getFirstName(),
            recycler.getUser().getLastName(),
            recycler.getUser().getAddress().getCity(),
            recycler.getUser().getAddress().getState(),
            recycler.getAcceptedMaterials()
        );
    }
}

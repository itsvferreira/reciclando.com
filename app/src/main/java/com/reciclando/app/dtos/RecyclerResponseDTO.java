package com.reciclando.app.dtos;

import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.enums.Material;
import java.util.List;

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

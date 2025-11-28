package com.reciclando.app.dtos;

import java.util.List;
import com.reciclando.app.Models.enums.Material;

public record RecyclerResponseDTO(
        Long userId,
        String firstName,
        String lastName,
        String city,
        String state,
        List<Material> acceptedMaterials
) {}

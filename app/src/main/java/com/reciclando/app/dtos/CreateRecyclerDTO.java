package com.reciclando.app.dtos;

import java.util.List;
import com.reciclando.app.Models.enums.Material;

public record CreateRecyclerDTO(
        Long userId,
        List<Material> acceptedMaterials
) {}

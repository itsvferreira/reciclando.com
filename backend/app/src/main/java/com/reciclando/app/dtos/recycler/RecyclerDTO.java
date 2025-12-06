package com.reciclando.app.dtos.recycler;

import java.util.List;

import com.reciclando.app.models.enums.Material;

public record RecyclerDTO(
        Long userId,
        List<Material> acceptedMaterials
) {}

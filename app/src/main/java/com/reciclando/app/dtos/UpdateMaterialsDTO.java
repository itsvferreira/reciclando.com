package com.reciclando.app.dtos;

import java.util.List;
import com.reciclando.app.Models.enums.Material;

public record UpdateMaterialsDTO(
        List<Material> acceptedMaterials
) {}

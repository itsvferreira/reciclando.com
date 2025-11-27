package com.reciclando.app.Controllers.v1;

import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.enums.Material;
import com.reciclando.app.Services.RecyclerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recyclers")
public class RecyclerController {

    private final RecyclerService recyclerService;

    public RecyclerController(RecyclerService recyclerService) {
        this.recyclerService = recyclerService;
    }


    @PostMapping
    public ResponseEntity<Recycler> createRecycler(@RequestBody CreateRecyclerDTO dto) {
        Recycler recycler = recyclerService.createRecycler(dto.userId(), dto.acceptedMaterials());
        return ResponseEntity.ok(recycler);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<Recycler> getById(@PathVariable Long userId) {
        Recycler recycler = recyclerService.getByUserID(userId);
        return ResponseEntity.ok(recycler);
    }


    @GetMapping
    public ResponseEntity<List<Recycler>> getAll() {
        return ResponseEntity.ok(recyclerService.getAll());
    }


    @PutMapping("/{userId}/materials")
    public ResponseEntity<Recycler> updateMaterials(
            @PathVariable Long userId,
            @RequestBody UpdateMaterialsDTO dto) {

        Recycler updated = recyclerService.updateMaterials(userId, dto.acceptedMaterials());
        return ResponseEntity.ok(updated);
    }


    @GetMapping("/material/{material}")
    public ResponseEntity<List<Recycler>> findByMaterial(@PathVariable Material material) {
        return ResponseEntity.ok(recyclerService.findByAcceptedMaterial(material));
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteRecycler(@PathVariable Long userId) {
        recyclerService.deleteRecycler(userId);
        return ResponseEntity.noContent().build();
    }


    public record CreateRecyclerDTO(Long userId, List<Material> acceptedMaterials) {}
    public record UpdateMaterialsDTO(List<Material> acceptedMaterials) {}
}
package com.reciclando.app.controllers.v1;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.reciclando.app.dtos.CreateRecyclerDTO;
import com.reciclando.app.dtos.RecyclerDTO;
import com.reciclando.app.dtos.RecyclerResponseDTO;
import com.reciclando.app.dtos.UpdateMaterialsDTO;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.services.RecyclerService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/recyclers")
public class RecyclerController {

    private final RecyclerService recyclerService;

    public RecyclerController(RecyclerService recyclerService) {
        this.recyclerService = recyclerService;
    }


   @GetMapping
    public ResponseEntity<List<RecyclerResponseDTO>> getRecyclers(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Material material) {
                
        var recyclers = recyclerService.search(city, material)
                .stream()
                .map(RecyclerResponseDTO::fromRecycler)
                .toList();
        return ResponseEntity.ok(recyclers);
}


    
    @GetMapping("/{id}")
    public ResponseEntity<RecyclerResponseDTO> getRecyclerById(@PathVariable Long id) {
        try {
            RecyclerResponseDTO recycler = RecyclerResponseDTO.fromRecycler(
                recyclerService.getByUserID(id)
            );
            return ResponseEntity.status(HttpStatus.OK).body(recycler);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

   
    @PostMapping("/new")
    public ResponseEntity<RecyclerDTO> createRecycler(@RequestBody CreateRecyclerDTO createDto) {
        try {
            var recycler = recyclerService.createRecycler(createDto.userId(), createDto.acceptedMaterials());
            RecyclerDTO response = new RecyclerDTO(recycler.getUserId(), recycler.getAcceptedMaterials());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    
    @PutMapping("/{id}/materials")
    public ResponseEntity<RecyclerDTO> updateMaterials(
            @PathVariable Long id, 
            @RequestBody UpdateMaterialsDTO updateDto) {
        try {
            var recycler = recyclerService.updateMaterials(id, updateDto.acceptedMaterials());
            RecyclerDTO response = new RecyclerDTO(recycler.getUserId(), recycler.getAcceptedMaterials());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

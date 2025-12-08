package com.reciclando.app.controllers.v1;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reciclando.app.dtos.ad.AdRequestDTO;
import com.reciclando.app.dtos.ad.AdResponseDTO;
import com.reciclando.app.services.AdService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/ads")
public class AdController {

    private final AdService postService;

    public AdController(AdService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<AdResponseDTO>> listAds(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city) {
        List<AdResponseDTO> posts = postService.getAdsOrderByCreatedAt(category, city);
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdResponseDTO> getAdById(@PathVariable long id) {
        try {
            AdResponseDTO post = postService.getAdById(id);
            return ResponseEntity.status(HttpStatus.OK).body(post);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<AdResponseDTO>> getAdsByDonor(@PathVariable Long donorId) {
        try {
            List<AdResponseDTO> ads = postService.getAdsByDonorId(donorId);
            return ResponseEntity.status(HttpStatus.OK).body(ads);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<AdResponseDTO> createAd(@RequestBody AdRequestDTO postRequest) {
        try {
            AdResponseDTO createdPost = postService.createAd(postRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        try {
            postService.deleteAd(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}/conclude")
    public ResponseEntity<AdResponseDTO> concludeAd(
            @PathVariable Long id,
            @RequestParam String recyclerCode) {
        try {
            AdResponseDTO concludedAd = postService.concludeAd(id, recyclerCode);
            return ResponseEntity.status(HttpStatus.OK).body(concludedAd);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}

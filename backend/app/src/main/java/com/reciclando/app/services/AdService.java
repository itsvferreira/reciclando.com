package com.reciclando.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reciclando.app.dtos.ad.AdRequestDto;
import com.reciclando.app.dtos.ad.AdResponseDto;
import com.reciclando.app.models.Ad;
import com.reciclando.app.models.Donor;
import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.repositories.AdRepository;
import com.reciclando.app.repositories.RecyclerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdService {
    private final AdRepository postRepository;
    private final DonorService donorService;
    private final RecyclerRepository recyclerRepository;

    public AdService(AdRepository postRepository, DonorService donorService, RecyclerRepository recyclerRepository) {
        this.postRepository = postRepository;
        this.donorService = donorService;
        this.recyclerRepository = recyclerRepository;
    }

    @Transactional(readOnly = true)
    public List<AdResponseDto> getAdsOrderByCreatedAt(String category, String city) {
        String[] categories = category != null ? category.split("--") : null;
        List<Ad> ads = postRepository.findAllByOrderByCreatedAtDesc();
        ads = ads.stream()
                .filter(post -> {
                    if (categories == null || categories.length == 0) {
                        return true; // Se nenhuma categoria for fornecida, retorna todos os ads
                    }
                    for (String cat : categories) {
                        for (Material m : post.getCategory()) {
                            if (m.name().equalsIgnoreCase(cat)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }).filter(ad -> {
                    if (city != null) {
                        return ad.getDonor().getAddress().getCity().equals(city);
                    }
                    return true;
                })
                .toList();
        return ads.stream()
                .map(ad -> new AdResponseDto(
                        ad.getId(),
                        ad.getTitle(),
                        ad.getDescription(),
                        ad.getDonor().getFullName(),
                        ad.getDonor().getContact(),
                        ad.getLocationString(),
                        ad.getCategory(),
                        ad.getFormatedCreationDate(),
                        ad.getStatus()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AdResponseDto> getAdsByDonorId(Long donorId) {
        Donor donor = donorService.findById(donorId)
                .orElseThrow(() -> new EntityNotFoundException("Donor not found"));
        List<Ad> ads = postRepository.findByDonorOrderByCreatedAtDesc(donor);
        return ads.stream()
                .map(ad -> new AdResponseDto(
                        ad.getId(),
                        ad.getTitle(),
                        ad.getDescription(),
                        ad.getDonor().getFullName(),
                        ad.getDonor().getContact(),
                        ad.getLocationString(),
                        ad.getCategory(),
                        ad.getFormatedCreationDate(),
                        ad.getStatus()))
                .toList();
    }

    @Transactional(readOnly = true)
    public AdResponseDto getPostById(long id) {
        Ad ad = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        return new AdResponseDto(
                ad.getId(),
                ad.getTitle(),
                ad.getDescription(),
                ad.getDonor().getFullName(),
                ad.getDonor().getContact(),
                ad.getLocationString(),
                ad.getCategory(),
                ad.getFormatedCreationDate(),
                ad.getStatus());
    }

    @Transactional
    public AdResponseDto createPost(AdRequestDto post) {
        Donor donor = donorService.findById(post.getDonorId())
                .orElseThrow(() -> new EntityNotFoundException("Donor not found"));
        Ad newPost = new Ad(post.getTitle(), post.getDescription(), donor, post.getCategory());
        postRepository.save(newPost);
        return new AdResponseDto(
                newPost.getId(),
                newPost.getTitle(),
                newPost.getDescription(),
                newPost.getDonor().getFullName(),
                newPost.getDonor().getContact(),
                newPost.getLocationString(),
                newPost.getCategory(),
                newPost.getFormatedCreationDate());
    }

    @Transactional
    public void deleteAd(Long id) {
        Ad ad = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        postRepository.delete(ad);
    }

    @Transactional
    public AdResponseDto concludeAd(Long id, String recyclerCode) {
        Ad ad = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        
        if (!"active".equals(ad.getStatus())) {
            throw new IllegalArgumentException("Only active ads can be concluded");
        }
        
        if (recyclerCode == null || recyclerCode.trim().isEmpty()) {
            throw new IllegalArgumentException("Recycler code is required");
        }
        
        // Buscar reciclador pelo código
        Recycler recycler = recyclerRepository.findAll().stream()
                .filter(r -> recyclerCode.equals(r.getCode()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid recycler code"));
        
        ad.setStatus("concluded");
        ad.setRecycler(recycler);
        postRepository.save(ad);
        
        return new AdResponseDto(
                ad.getId(),
                ad.getTitle(),
                ad.getDescription(),
                ad.getDonor().getFullName(),
                ad.getDonor().getContact(),
                ad.getLocationString(),
                ad.getCategory(),
                ad.getFormatedCreationDate(),
                ad.getStatus());
    }
}

package com.reciclando.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reciclando.app.dtos.ad.AdRequestDto;
import com.reciclando.app.dtos.ad.AdResponseDto;
import com.reciclando.app.models.Ad;
import com.reciclando.app.models.Donor;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.repositories.AdRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdService {
    private final AdRepository postRepository;
    private final DonorService donorService;

    public AdService(AdRepository postRepository, DonorService donorService) {
        this.postRepository = postRepository;
        this.donorService = donorService;
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
                        ad.getFormatedCreationDate()))
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
                ad.getFormatedCreationDate());
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
}

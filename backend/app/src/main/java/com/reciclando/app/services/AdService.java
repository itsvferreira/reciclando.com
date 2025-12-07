package com.reciclando.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final FileStorageService fileStorageService;

    public AdService(AdRepository postRepository, DonorService donorService, FileStorageService fileStorageService) {
        this.postRepository = postRepository;
        this.donorService = donorService;
        this.fileStorageService = fileStorageService;
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
                        ad.getImagesPath()))
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
                ad.getImagesPath());
    }

    @Transactional
    public AdResponseDto createPost(AdRequestDto post, MultipartFile[] files) {
        Donor donor = donorService.findById(post.getDonorId())
                .orElseThrow(() -> new EntityNotFoundException("Donor not found"));
        Ad newPost = new Ad(post.getTitle(), post.getDescription(), donor, post.getCategory());

        newPost.setImagesPath(getImagePaths(files));

        postRepository.save(newPost);
        return new AdResponseDto(
                newPost.getId(),
                newPost.getTitle(),
                newPost.getDescription(),
                newPost.getDonor().getFullName(),
                newPost.getDonor().getContact(),
                newPost.getLocationString(),
                newPost.getCategory(),
                newPost.getFormatedCreationDate(),
                newPost.getImagesPath());
    }

    private List<String> getImagePaths(MultipartFile[] files) {
        List<String> imagesPath = new ArrayList<>();
        for (MultipartFile file : files) {
            imagesPath.add(fileStorageService.getStoredFiles(file));
        }
        return imagesPath;
    }
}

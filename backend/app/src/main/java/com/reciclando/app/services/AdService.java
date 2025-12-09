package com.reciclando.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.reciclando.app.dtos.ad.AdRequestDTO;
import com.reciclando.app.dtos.ad.AdResponseDTO;
import com.reciclando.app.models.Ad;
import com.reciclando.app.models.Address;
import com.reciclando.app.models.Donor;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.repositories.AdRepository;
import com.reciclando.app.repositories.AddressRepository;
import com.reciclando.app.repositories.DonorRepository;
import com.reciclando.app.repositories.RecyclerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdService {
    private final AdRepository adRepository;
    private final DonorRepository donorRepository;
    private final AddressRepository addressRepository;
    private final FileStorageService fileStorageService;
    private final RecyclerRepository recyclerRepository;

    public AdService(AdRepository adRepository, DonorRepository donorRepository,
            AddressRepository addressRepository, RecyclerRepository recyclerRepository,
            FileStorageService fileStorageService) {
        this.adRepository = adRepository;
        this.donorRepository = donorRepository;
        this.addressRepository = addressRepository;
        this.fileStorageService = fileStorageService;
        this.recyclerRepository = recyclerRepository;
    }

    @Transactional(readOnly = true)
    public List<AdResponseDTO> getAdsOrderByCreatedAt(String category, String city) {
        String[] categories = category != null ? category.split("--") : null;
        List<Ad> ads = adRepository.findAllByOrderByCreatedAtDesc();
        ads = ads.stream()
                .filter(ad -> {
                    if (categories == null || categories.length == 0) {
                        return true; // Se nenhuma categoria for fornecida, retorna todos os ads
                    }
                    for (String cat : categories) {
                        for (Material m : ad.getCategory()) {
                            if (m.name().equalsIgnoreCase(cat)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }).filter(ad -> {
                    if (city != null) {
                        return ad.getCity().equals(city);
                    }
                    return true;
                })
                .toList();
        return ads.stream()
                .map(ad -> createResponseDTO(ad)).toList();
    }

    @Transactional(readOnly = true)
    public List<AdResponseDTO> getAdsByDonorId(Long donorId) {
        Donor donor = donorRepository.findById(donorId)
                .orElseThrow(() -> new EntityNotFoundException("Donor not found"));
        List<Ad> ads = adRepository.findByDonorOrderByCreatedAtDesc(donor);
        return ads.stream()
                .map(ad -> createResponseDTO(ad)).toList();
    }

    @Transactional(readOnly = true)
    public AdResponseDTO getAdById(long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        return createResponseDTO(ad);
    }

    @Transactional
    public AdResponseDTO createAd(AdRequestDTO ad, MultipartFile[] files) {
        Donor donor = donorRepository.findById(ad.getDonorId())
                .orElseThrow(() -> new EntityNotFoundException("Donor not found"));

        Address address = getAddress(ad);

        Ad newAd = new Ad(ad.getTitle(), ad.getDescription(), donor, ad.getCategory(), address);
        newAd.setImagesPath(getImagePaths(files));

        adRepository.save(newAd);
        return createResponseDTO(newAd);
    }

    @Transactional
    public AdResponseDTO updateAd(Long id, AdRequestDTO updatedAd) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));

        ad.setTitle(updatedAd.getTitle());
        ad.setDescription(updatedAd.getDescription());
        ad.setCategory(updatedAd.getCategory());

        Address address = getAddress(updatedAd);
        ad.setAddress(address);

        ad.setPhone(ad.getPhone());
        ad.setEmail(ad.getEmail());

        adRepository.save(ad);
        return createResponseDTO(ad);
    }

    @Transactional
    public void deleteAd(Long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        adRepository.delete(ad);
    }

    @Transactional
    public AdResponseDTO concludeAd(Long id, String recyclerCode) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));

        if (!"active".equals(ad.getStatus())) {
            throw new IllegalArgumentException("Only active ads can be concluded");
        }

        if (recyclerCode == null || recyclerCode.trim().isEmpty()) {
            throw new IllegalArgumentException("Recycler code is required");
        }

        if (recyclerRepository.findByCode(recyclerCode) != null) {
            ad.setStatus("concluded");
            ad.setConclusionCode(recyclerCode);
            adRepository.save(ad);
            return createResponseDTO(ad);
        }

        throw new IllegalArgumentException("Invalid confirmation code");
    }

    private Address getAddress(AdRequestDTO ad) {
        Address address = addressRepository.findByPostalCode(ad.getPostalCode());

        if (address == null) {
            address = new Address(ad.getPostalCode(), ad.getCity(), ad.getState(), ad.getNeighborhood());
            addressRepository.save(address);
        }

        return address;
    }

    private List<String> getImagePaths(MultipartFile[] files) {
        List<String> imagesPath = new ArrayList<>();
        for (MultipartFile file : files) {
            imagesPath.add(fileStorageService.getStoredFiles(file));
        }
        return imagesPath;
    }

    private AdResponseDTO createResponseDTO(Ad ad) {
        return new AdResponseDTO(
                ad.getId(),
                ad.getTitle(),
                ad.getDescription(),
                ad.getDonor().getFullName(),
                ad.getDonor().getContact(),
                ad.getCategory(),
                ad.getPostalCode(),
                ad.getCity(),
                ad.getState(),
                ad.getNeighborhood(),
                ad.getCreatedAt().toString(),
                ad.getImagesPath(),
                ad.getStatus(),
                ad.getPhone(),
                ad.getEmail(),
                ad.getConclusionCode());
    }
}

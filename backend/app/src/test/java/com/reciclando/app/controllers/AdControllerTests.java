package com.reciclando.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.reciclando.app.controllers.v1.AdController;
import com.reciclando.app.dtos.ad.AdRequestDto;
import com.reciclando.app.dtos.ad.AdResponseDto;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.services.AdService;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import jakarta.persistence.EntityNotFoundException;

@WebMvcTest(AdController.class)
public class AdControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdService adService;

    private List<AdResponseDto> ads;

    @BeforeEach
    public void init() {
        ads = new ArrayList<>();
        ads.add(new AdResponseDto(1L, "Title1", "Description1", "Donor1", "Contact1", "Location1",
                List.of(Material.PAPER),
                "2024-06-01, 10:00", new ArrayList<>()));
        ads.add(new AdResponseDto(2L, "Title2", "Description2", "Donor2", "Contact2", "Location2",
                List.of(Material.PLASTIC),
                "2024-06-02, 11:00", new ArrayList<>()));
    }

    @Test
    public void testGetAds() throws Exception {
        when(adService.getAdsOrderByCreatedAt(null, null)).thenReturn(ads);
        mockMvc.perform(get("/api/v1/ads"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Title1"))
                .andExpect(jsonPath("$[1].title").value("Title2"));
    }

    @Test
    public void testGetAdById_Success() throws Exception {
        long adId = 1L;
        when(adService.getPostById(adId)).thenReturn(ads.get(0));
        mockMvc.perform(get("/api/v1/ads/{id}", adId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Title1"));
    }

    @Test
    public void testGetAdById_NotFound() throws Exception {
        long adId = 999L;
        when(adService.getPostById(adId)).thenThrow(new EntityNotFoundException("Ad not found"));
        mockMvc.perform(get("/api/v1/ads/{id}", adId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAdByFilter_Success() throws Exception {
        String category = "Material1";
        when(adService.getAdsOrderByCreatedAt(category, null)).thenReturn(List.of(ads.get(0)));
        mockMvc.perform(get("/api/v1/ads?category={category}", "Material1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Title1"));
    }

    @Test
    public void testCreateAd_Success() throws Exception {
        AdResponseDto newAdResponse = new AdResponseDto(3L, "New Title", "New Description", "Donor3",
                "Contact3",
                "Location3",
                List.of(Material.PAPER),
                "2024-06-03, 12:00", new ArrayList<>());
        String requestBody = """
                {
                "title": "New Title",
                "description": "New Description",
                "donorId": 1,
                "category": ["PAPER"]
                }
                """;
        MockMultipartFile multipartFile = new MockMultipartFile(
                "files",
                "myImage.png",
                "image/png",
                "cat image".getBytes());
        MockMultipartFile adRequestPart = new MockMultipartFile("postRequest", "", "application/json",
                requestBody.getBytes());
        when(adService.createPost(any(AdRequestDto.class), any(MockMultipartFile[].class)))
                .thenReturn(newAdResponse);
        mockMvc.perform(multipart("/api/v1/ads/new")
                .file(multipartFile)
                .file(adRequestPart))
                .andExpect(status().isCreated());
    }
}

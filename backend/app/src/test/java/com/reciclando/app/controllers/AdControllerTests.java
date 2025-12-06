package com.reciclando.app.controllers;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.reciclando.app.controllers.v1.AdController;
import com.reciclando.app.dtos.ad.AdRequestDTO;
import com.reciclando.app.dtos.ad.AdResponseDTO;
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

    private List<AdResponseDTO> ads;

    @BeforeEach
    public void init() {
        ads = new ArrayList<>();
        ads.add(new AdResponseDTO(1L, "Title1", "Description1", "Donor1", "Contact1",
                List.of(Material.PLASTIC), "11111111", "City1", "State1", "Neighborhood1",
                "2023-06-01, 10:00"));
        ads.add(new AdResponseDTO(2L, "Title2", "Description2", "Donor2", "Contact2",
                List.of(Material.METAL, Material.GLASS), "22222222", "City2", "State2", "Neighborhood2",
                "2023-06-02, 15:30"));
        ads.add(new AdResponseDTO(3L, "Title3", "Description3", "Donor3", "Contact3",
                List.of(Material.PAPER), "33333333", "City1", "State1", "Neighborhood3",
                "2023-06-03, 12:00"));
    }

    @Test
    public void testGetAds() throws Exception {
        when(adService.getAdsOrderByCreatedAt(null, null)).thenReturn(ads);
        mockMvc.perform(get("/api/v1/ads"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].title").value("Title1"))
                .andExpect(jsonPath("$[1].title").value("Title2"))
                .andExpect(jsonPath("$[2].title").value("Title3"));
    }

    @Test
    public void testGetAdById_Success() throws Exception {
        long adId = 1L;
        when(adService.getAdById(adId)).thenReturn(ads.get(0));
        mockMvc.perform(get("/api/v1/ads/{id}", adId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Title1"));
    }

    @Test
    public void testGetAdById_NotFound() throws Exception {
        long adId = 999L;
        when(adService.getAdById(adId)).thenThrow(new EntityNotFoundException("Ad not found"));
        mockMvc.perform(get("/api/v1/ads/{id}", adId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAdByCategory_Success() throws Exception {
        String category = "plastic";
        when(adService.getAdsOrderByCreatedAt(category, null)).thenReturn(List.of(ads.get(0)));
        mockMvc.perform(get("/api/v1/ads?category={category}", "plastic"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Title1"));
    }

    @Test
    public void testGetAdByCity_Success() throws Exception {
        String city = "City1";
        when(adService.getAdsOrderByCreatedAt(null, city)).thenReturn(List.of(ads.get(0), ads.get(2)));
        mockMvc.perform(get("/api/v1/ads?city={city}", "City1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Title1"))
                .andExpect(jsonPath("$[1].title").value("Title3"));
    }

    @Test
    public void testGetAdByCategoryAndCity_Success() throws Exception {
        String category = "paper";
        String city = "City1";
        when(adService.getAdsOrderByCreatedAt(category, city)).thenReturn(List.of(ads.get(2)));
        mockMvc.perform(get("/api/v1/ads?category={category}&city={city}", category, city))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Title3"));
    }

    @Test
    public void testGetAdByCategoryAndCity_Fail() throws Exception {
        String category = "metal";
        String city = "City1";
        when(adService.getAdsOrderByCreatedAt(category, city)).thenReturn(List.of());
        mockMvc.perform(get("/api/v1/ads?category={category}&city={city}", category, city))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    public void testCreateAd() throws Exception {
        AdRequestDTO newAdRequest = new AdRequestDTO("New Title", "New Description", 1L,
                List.of(Material.PLASTIC), "11111111", "City1", "State1", "Neighborhood1");
        AdResponseDTO newAdResponse = new AdResponseDTO(1L, "New Title", "New Description", "Donor1",
                "Contact1",
                List.of(Material.PLASTIC), "11111111", "City1", "State1", "Neighborhood1",
                "2025-12-06T12:50:40.569022236");
        String requestBody = """
                {
                    "title": "New Title",
                    "description": "New Description",
                    "donorId": 1,
                    "category": [0],
                    "postalCode": "123456790",
                    "city": "City1",
                    "state": "State1",
                    "neighborhood": "Neighborhood1"
                }""";
        when(adService.createAd(newAdRequest)).thenReturn(newAdResponse);
        mockMvc.perform(post("/api/v1/ads/new")
                .contentType("application/json")
                .content(requestBody))
                .andExpect(status().isCreated());
    }
}

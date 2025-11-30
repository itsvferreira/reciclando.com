package com.reciclando.app.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.reciclando.app.Controllers.v1.AdController;
import com.reciclando.app.Services.AdService;
import com.reciclando.app.dtos.ad.AdRequestDto;
import com.reciclando.app.dtos.ad.AdResponseDto;

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
                ads.add(new AdResponseDto("Title1", "Description1", "Donor1", "Contact1", "Location1",
                                "Material1",
                                "2024-06-01, 10:00"));
                ads.add(new AdResponseDto("Title2", "Description2", "Donor2", "Contact2", "Location2",
                                "Material2",
                                "2024-06-02, 11:00"));
        }

        @Test
        public void testGetAds() throws Exception {
                when(adService.getAdsOrderByCreatedAt(null)).thenReturn(ads);
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
                String filter = "Material1";
                when(adService.getAdsOrderByCreatedAt(filter)).thenReturn(List.of(ads.get(0)));
                mockMvc.perform(get("/api/v1/ads?filter={filter}", "Material1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.length()").value(1))
                                .andExpect(jsonPath("$[0].title").value("Title1"));
        }

        @Test
        public void testCreateAd() throws Exception {
                AdRequestDto newAdRequest = new AdRequestDto("New Title", "New Description", 1L, "Material1");
                AdResponseDto newAdResponse = new AdResponseDto("New Title", "New Description", "Donor1", "Contact1",
                                "Location1", "Material3", "2024-06-03, 12:00");
                String requestBody = """
                                {
                                    "title": "New Title",
                                    "description": "New Description",
                                    "donorId": 1,
                                    "materialCategory": "Material1"
                                }
                                """;
                when(adService.createPost(newAdRequest)).thenReturn(newAdResponse);
                mockMvc.perform(post("/api/v1/ads/new")
                                .contentType("application/json")
                                .content(requestBody))
                                .andExpect(status().isCreated());
        }
}

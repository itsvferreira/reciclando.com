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
                                "2024-06-01, 10:00", "active"));
                ads.add(new AdResponseDto(2L, "Title2", "Description2", "Donor2", "Contact2", "Location2",
                                List.of(Material.PLASTIC),
                                "2024-06-02, 11:00", "concluded"));
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
        public void testCreateAd() throws Exception {
                AdRequestDto newAdRequest = new AdRequestDto("New Title", "New Description",
                                1L, List.of(Material.PLASTIC));
                AdResponseDto newAdResponse = new AdResponseDto(3L, "New Title", "New Description", "Donor3",
                                "Contact3",
                                "Location3",
                                List.of(Material.METAL, Material.GLASS),
                                "2024-06-03, 12:00", "active");
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


        @Test
        public void testGetAdsByDonor() throws Exception {
                Long donorId = 4L;
                List<AdResponseDto> donorAds = List.of(ads.get(0));
                when(adService.getAdsByDonorId(donorId)).thenReturn(donorAds);

                mockMvc.perform(get("/api/v1/ads/donor/{donorId}", donorId))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.length()").value(1))
                                .andExpect(jsonPath("$[0].title").value("Title1"));

                verify(adService, times(1)).getAdsByDonorId(donorId);
        }


        @Test
        public void testDeleteAd() throws Exception {
                Long adId = 1L;
                doNothing().when(adService).deleteAd(adId);

                mockMvc.perform(delete("/api/v1/ads/{id}", adId))
                                .andExpect(status().isNoContent());

                verify(adService, times(1)).deleteAd(adId);
        }



        @Test
        public void testConcludeAd_Success() throws Exception {
                Long adId = 1L;
                String recyclerCode = "5678";

                AdResponseDto concludedAd = new AdResponseDto(
                                adId,
                                "Title1",
                                "Description1",
                                "Donor1",
                                "Contact1",
                                "Location1",
                                List.of(Material.PAPER),
                                "2024-06-01, 10:00",
                                "concluded");

                when(adService.concludeAd(adId, recyclerCode)).thenReturn(concludedAd);

                mockMvc.perform(patch("/api/v1/ads/{id}/conclude", adId)
                                .param("recyclerCode", recyclerCode))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(adId))
                                .andExpect(jsonPath("$.status").value("concluded"))
                                .andExpect(jsonPath("$.title").value("Title1"));

                verify(adService, times(1)).concludeAd(adId, recyclerCode);
        }


        @Test
        public void testConcludeAd_InvalidCode() throws Exception {
                Long adId = 1L;
                String invalidCode = "0000";

                when(adService.concludeAd(adId, invalidCode))
                                .thenThrow(new IllegalArgumentException("Invalid recycler code"));

                mockMvc.perform(patch("/api/v1/ads/{id}/conclude", adId)
                                .param("recyclerCode", invalidCode))
                                .andExpect(status().isBadRequest());

                verify(adService, times(1)).concludeAd(adId, invalidCode);
        }



}

package com.reciclando.app.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reciclando.app.Models.enums.Material;
import com.reciclando.app.Repositories.UserRepository;
import com.reciclando.app.Models.User;
import com.reciclando.app.dtos.UpdateMaterialsDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class RecyclerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private Long janeUserId;

    @BeforeEach
    void setup() {
        User janeUser = userRepository.findAll().stream()
            .filter(u -> "Jane".equals(u.getFirstName()) && "Smith".equals(u.getLastName()))
            .findFirst()
            .orElse(null);
        
        if (janeUser != null) {
            janeUserId = janeUser.getId();
        }
    }

    @Test
    void testGetAll() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].acceptedMaterials").exists());
    }

    @Test
    void testGetById() throws Exception {
        if (janeUserId == null) {
            System.out.println("Jane Smith não encontrada, pulando teste");
            return;
        }

        mockMvc.perform(get("/api/v1/recyclers/" + janeUserId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(janeUserId))
            .andExpect(jsonPath("$.firstName").value("Jane"))
            .andExpect(jsonPath("$.acceptedMaterials").isArray())
            .andExpect(jsonPath("$.acceptedMaterials.length()").value(2));
    }

    
    @Test
    void testUpdateMaterials() throws Exception {
        if (janeUserId == null) {
            System.out.println("Jane Smith não encontrada, pulando teste");
            return;
        }

        UpdateMaterialsDTO dto = new UpdateMaterialsDTO(List.of(Material.METAL, Material.GLASS));

        mockMvc.perform(put("/api/v1/recyclers/" + janeUserId + "/materials")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(janeUserId))
            .andExpect(jsonPath("$.acceptedMaterials").isArray())
            .andExpect(jsonPath("$.acceptedMaterials.length()").value(2));
    }

    @Test
    void testFindByMaterial() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers")
                .param("material", "PAPER"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].acceptedMaterials").isArray());
    }

    @Test
    void testFindByCity() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers")
                .param("city", "Example Town"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].firstName").value("Jane"))
            .andExpect(jsonPath("$[0].city").value("Example Town"));
    }

    @Test
    void testFindByCityAndMaterial() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers")
                .param("city", "Example Town")
                .param("material", "PLASTIC"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].firstName").value("Jane"))
            .andExpect(jsonPath("$[0].city").value("Example Town"));
    }

    @Test
    void testFindByMaterialNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers")
                .param("material", "GLASS"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void testFindByCityNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/recyclers")
                .param("city", "NonExistentCity"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(0));
    }
}



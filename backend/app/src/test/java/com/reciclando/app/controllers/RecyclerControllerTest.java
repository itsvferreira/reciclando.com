package com.reciclando.app.controllers;

import com.reciclando.app.controllers.v1.RecyclerController;
import com.reciclando.app.models.Address;
import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.User;
import com.reciclando.app.models.enums.AccountType;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.services.RecyclerService;

import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecyclerController.class)
public class RecyclerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RecyclerService recyclerService;

    private List<Recycler> recyclers;
    private Recycler janeRecycler;
    private Recycler carlosRecycler;

    @BeforeEach
    public void init() {
        recyclers = new ArrayList<>();
        
        // Mock do usuário Jane
        User janeUser = Mockito.mock(User.class);
        Address janeAddress = Mockito.mock(Address.class);
        
        when(janeAddress.getCity()).thenReturn("Example Town");
        when(janeAddress.getState()).thenReturn("ET");
        
        when(janeUser.getId()).thenReturn(2L);
        when(janeUser.getFirstName()).thenReturn("Jane");
        when(janeUser.getLastName()).thenReturn("Smith");
        when(janeUser.getAccountType()).thenReturn(AccountType.RECYCLER);
        when(janeUser.getAddress()).thenReturn(janeAddress);
        
        List<Material> janeMaterials = new ArrayList<>();
        janeMaterials.add(Material.PAPER);
        janeMaterials.add(Material.PLASTIC);
        
        janeRecycler = Mockito.mock(Recycler.class);
        when(janeRecycler.getUserId()).thenReturn(2L);
        when(janeRecycler.getUser()).thenReturn(janeUser);
        when(janeRecycler.getAcceptedMaterials()).thenReturn(janeMaterials);
        
        // Mock do usuário Carlos
        User carlosUser = Mockito.mock(User.class);
        Address carlosAddress = Mockito.mock(Address.class);
        
        when(carlosAddress.getCity()).thenReturn("Porto Alegre");
        when(carlosAddress.getState()).thenReturn("RS");
        
        when(carlosUser.getId()).thenReturn(3L);
        when(carlosUser.getFirstName()).thenReturn("Carlos");
        when(carlosUser.getLastName()).thenReturn("Silva");
        when(carlosUser.getAccountType()).thenReturn(AccountType.RECYCLER);
        when(carlosUser.getAddress()).thenReturn(carlosAddress);
        
        List<Material> carlosMaterials = new ArrayList<>();
        carlosMaterials.add(Material.PAPER);
        
        carlosRecycler = Mockito.mock(Recycler.class);
        when(carlosRecycler.getUserId()).thenReturn(3L);
        when(carlosRecycler.getUser()).thenReturn(carlosUser);
        when(carlosRecycler.getAcceptedMaterials()).thenReturn(carlosMaterials);

        recyclers.add(janeRecycler);
        recyclers.add(carlosRecycler);
    }

    @Test
    public void testGetRecyclers_All() throws Exception {
        when(recyclerService.search(null, null)).thenReturn(recyclers);

        mockMvc.perform(get("/api/v1/recyclers"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].firstName").value("Jane"))
            .andExpect(jsonPath("$[1].firstName").value("Carlos"));
    }

    @Test
    public void testGetRecyclerById_Success() throws Exception {
        long recyclerId = 2L;
        when(recyclerService.getByUserID(recyclerId)).thenReturn(janeRecycler);

        mockMvc.perform(get("/api/v1/recyclers/{id}", recyclerId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(2))
            .andExpect(jsonPath("$.firstName").value("Jane"))
            .andExpect(jsonPath("$.city").value("Example Town"))
            .andExpect(jsonPath("$.acceptedMaterials.length()").value(2));
    }

    @Test
    public void testGetRecyclerById_NotFound() throws Exception {
        long recyclerId = 999L;
        when(recyclerService.getByUserID(recyclerId))
            .thenThrow(new EntityNotFoundException("Recycler not found with user id: " + recyclerId));

        mockMvc.perform(get("/api/v1/recyclers/{id}", recyclerId))
            .andExpect(status().isNotFound());
    }

    @Test
    public void testGetRecyclers_ByMaterial() throws Exception {
        when(recyclerService.search(null, Material.PAPER)).thenReturn(recyclers);

        mockMvc.perform(get("/api/v1/recyclers")
                .param("material", "PAPER"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void testGetRecyclers_ByCity() throws Exception {
        when(recyclerService.search("Example Town", null))
            .thenReturn(List.of(janeRecycler));

        mockMvc.perform(get("/api/v1/recyclers")
                .param("city", "Example Town"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].firstName").value("Jane"))
            .andExpect(jsonPath("$[0].city").value("Example Town"));
    }

    @Test
    public void testGetRecyclers_ByCityAndMaterial() throws Exception {
        when(recyclerService.search("Example Town", Material.PLASTIC))
            .thenReturn(List.of(janeRecycler));

        mockMvc.perform(get("/api/v1/recyclers")
                .param("city", "Example Town")
                .param("material", "PLASTIC"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].firstName").value("Jane"));
    }

    @Test
    public void testCreateRecycler_Success() throws Exception {
        List<Material> materials = new ArrayList<>();
        materials.add(Material.METAL);
        materials.add(Material.GLASS);

        User newUser = Mockito.mock(User.class);
        Address newAddress = Mockito.mock(Address.class);
        
        when(newAddress.getCity()).thenReturn("New City");
        when(newAddress.getState()).thenReturn("NC");
        when(newUser.getId()).thenReturn(4L);
        when(newUser.getAddress()).thenReturn(newAddress);

        Recycler newRecycler = Mockito.mock(Recycler.class);
        when(newRecycler.getUserId()).thenReturn(4L);
        when(newRecycler.getUser()).thenReturn(newUser);
        when(newRecycler.getAcceptedMaterials()).thenReturn(materials);

        String requestBody = """
                {
                    "userId": 4,
                    "acceptedMaterials": ["METAL", "GLASS"]
                }
                """;

        when(recyclerService.createRecycler(eq(4L), anyList())).thenReturn(newRecycler);

        mockMvc.perform(post("/api/v1/recyclers/new")
                .contentType("application/json")
                .content(requestBody))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.userId").value(4))
            .andExpect(jsonPath("$.acceptedMaterials.length()").value(2));
    }

    @Test
    public void testCreateRecycler_BadRequest() throws Exception {
        String requestBody = """
                {
                    "userId": 999,
                    "acceptedMaterials": ["METAL"]
                }
                """;

        when(recyclerService.createRecycler(eq(999L), anyList()))
            .thenThrow(new IllegalArgumentException("User not found"));

        mockMvc.perform(post("/api/v1/recyclers/new")
                .contentType("application/json")
                .content(requestBody))
            .andExpect(status().isBadRequest());
    }

    @Test
    public void testUpdateMaterials_Success() throws Exception {
        List<Material> newMaterials = new ArrayList<>();
        newMaterials.add(Material.METAL);
        newMaterials.add(Material.GLASS);

        Recycler updatedRecycler = Mockito.mock(Recycler.class);
        when(updatedRecycler.getUserId()).thenReturn(2L);
        when(updatedRecycler.getAcceptedMaterials()).thenReturn(newMaterials);

        String requestBody = """
                {
                    "acceptedMaterials": ["METAL", "GLASS"]
                }
                """;

        when(recyclerService.updateMaterials(eq(2L), anyList())).thenReturn(updatedRecycler);

        mockMvc.perform(put("/api/v1/recyclers/{id}/materials", 2L)
                .contentType("application/json")
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(2))
            .andExpect(jsonPath("$.acceptedMaterials.length()").value(2));
    }

    @Test
    public void testUpdateMaterials_NotFound() throws Exception {
        String requestBody = """
                {
                    "acceptedMaterials": ["METAL"]
                }
                """;

        when(recyclerService.updateMaterials(eq(999L), anyList()))
            .thenThrow(new IllegalArgumentException("Recycler not found"));

        mockMvc.perform(put("/api/v1/recyclers/{id}/materials", 999L)
                .contentType("application/json")
                .content(requestBody))
            .andExpect(status().isNotFound());
    }

    @Test
    public void testGetRecyclers_EmptyResult() throws Exception {
        when(recyclerService.search(null, Material.GLASS))
            .thenReturn(new ArrayList<>());

        mockMvc.perform(get("/api/v1/recyclers")
                .param("material", "GLASS"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(0));
    }
}

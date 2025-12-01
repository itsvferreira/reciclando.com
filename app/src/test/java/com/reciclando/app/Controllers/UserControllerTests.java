package com.reciclando.app.Controllers;

// Traz as classes necessárias para montar o teste.
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reciclando.app.Models.User;
import com.reciclando.app.Models.enums.AccountType;
import com.reciclando.app.Services.UserService;
import com.reciclando.app.Controllers.v1.UserController;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// WebMvcTest Sobe só o controller para teste (sem subir o sistema inteiro).

@WebMvcTest(UserController.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private User createTestUser(Long id, String firstName, String lastName, AccountType accountType) {
        User user = new User(firstName, lastName, "123456789", accountType);
        
        try {
            var idField = User.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(user, id);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao setar ID", e);
        }
        
        return user;
    }

    @Test
    void shouldReturnAllUsers() throws Exception {
        User user = createTestUser(1L, "João", "Silva", AccountType.DONOR);

        Mockito.when(userService.getAllUsers()).thenReturn(List.of(user));

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].firstName").value("João"))
                .andExpect(jsonPath("$[0].lastName").value("Silva"));
    }

    @Test
    void shouldReturnUserById() throws Exception {
        User user = createTestUser(1L, "Maria", "Santos", AccountType.RECYCLER);

        Mockito.when(userService.getUserById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/v1/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("Maria"))
                .andExpect(jsonPath("$.accountType").value("RECYCLER")); 
    }

    @Test
    void shouldCreateUser() throws Exception {
        User newUser = new User("Carlos", "Oliveira", "987654321", AccountType.DONOR);
        User savedUser = createTestUser(1L, "Carlos", "Oliveira", AccountType.DONOR);

        Mockito.when(userService.createUser(Mockito.any(User.class))).thenReturn(savedUser);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.firstName").value("Carlos"));
    }

    @Test
    void shouldFilterUsersByAccountType() throws Exception {
        User user = createTestUser(1L, "Ana", "Costa", AccountType.DONOR);

        //  O service espera String, então converta o enum para string
        Mockito.when(userService.getUserByAccountType("DONOR")).thenReturn(List.of(user));

        mockMvc.perform(get("/api/v1/users")
                .param("accountType", "DONOR")) 
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].accountType").value("DONOR")); 
    }

    @Test
    void shouldReturnRecyclers() throws Exception {
    User recycler = createTestUser(1L, "Paulo", "Lima", AccountType.RECYCLER);
    
// Testa o endpoint GET /api/v1/users/recicladores.
// Garante que o controller retorna corretamente a lista de usuários
// do tipo RECICLADOR, validando status HTTP, tamanho da lista
// e os campos do JSON de resposta.
    Mockito.when(userService.getUserByAccountType("RECICLADOR")).thenReturn(List.of(recycler));

    mockMvc.perform(get("/api/v1/users/recicladores"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].id").value(1L))
            .andExpect(jsonPath("$[0].firstName").value("Paulo"))
            .andExpect(jsonPath("$[0].accountType").value("RECYCLER"));
}
}
package com.reciclando.app.controllers.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import com.reciclando.app.models.Ad;
import com.reciclando.app.models.User;
import com.reciclando.app.services.UserService;

@RestController 
@RequestMapping("/api/v1/users")
@Qualifier("userControllerV1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // ROTAS BÁSICAS DE USUÁRIO
    // GET /api/v1/users
    @GetMapping
    public List<User> getAllUsers(
        @RequestParam(required = false) String accountType,
        @RequestParam(required = false) String city
    ) {
        if (accountType != null && !accountType.isEmpty()) {
            return userService.getUserByAccountType(accountType);
        }
        
        if (city != null && !city.isEmpty()) {
            return userService.getUserByCity(city);
        }
        
        return userService.getAllUsers();
    }

    // GET /api/v1/users/{id}
    // Visualizar perfil de um usuário
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    // POST /api/v1/users
    // Criar um novo usuário
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }

    // PUT /api/v1/users/{id}
    // Atualizar um usuário
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // DELETE /api/v1/users/{id}
    // Deletar um usuário
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // ROTAS DOADOR
    // GET /api/v1/users/{id}/meus-anuncios
    
    @GetMapping("/{id}/meus-anuncios")
    public List<Ad> getMeusAnuncios(
        @PathVariable Long id,
        @RequestParam(required = false) String status
    ) {
        return userService.getAnuncioDoUsuario(id, status);
    }

    // GET /api/v1/users/{id}/historico-doacoes
    @GetMapping("/{id}/historico-doacoes")
    public List<Ad> getHistoricoDoacoes(@PathVariable Long id){
        return userService.getHistoricoDoacoes(id);
    }

    // ROTAS RECICLADOR
    // GET /api/v1/users/{id}/minhas-coletas
    @GetMapping("/{id}/minhas-coletas")
    public List<Ad> getMinhasColetas(
        @PathVariable Long id,
        @RequestParam(required = false) String status
    ) {
        return userService.getColetasDoReciclador(id, status);
    }

    // GET /api/v1/users/{id}/historico-coletas
    @GetMapping("/{id}/historico-coletas")
    public List<Ad> getHistoricoColetas(@PathVariable Long id){
        return userService.getHistoricoColetas(id);
    }

    // GET /api/v1/users/recicladores
    @GetMapping("/recicladores")
    public List<User> getRecicladores(
        @RequestParam(required = false) String city
    ) {
        if (city != null && !city.isEmpty()) {
            return userService.getRecicladoresPorCidade(city);
        }
        return userService.getUserByAccountType("RECICLADOR");
    }

}

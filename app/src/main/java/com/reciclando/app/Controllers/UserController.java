package com.reciclando.app.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.reciclando.app.Models.User;
import com.reciclando.app.Services.UserService;

@RestController 
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users
    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    // POST /api/users
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User updateUser) {
        return userService.updateUser(id, updateUser);
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

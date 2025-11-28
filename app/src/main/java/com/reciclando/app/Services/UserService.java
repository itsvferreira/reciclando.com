package com.reciclando.app.Services;

import com.reciclando.app.Models.User;
import com.reciclando.app.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service 
public class UserService {
    // Preciso acessar o banco através do repositório
    private final UserRepository userRepository;

    //O spring me dá o repository automaticamente 
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Listar todos os usuários
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Buscar um usuário pelo ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Atualizar usuário existente 

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)

        .map(user -> {
            
            
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setPhone(updatedUser.getPhone());
            user.setAccountType(updatedUser.getAccountType());
            user.setAddress(updatedUser.getAddress());
            user.setPhotoPath(updatedUser.getPhotoPath());
            
            
            return userRepository.save(user);
        })
        .orElse(updatedUser);

    }
    
    //Deletar usuário

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    
    }

        

    

    
}
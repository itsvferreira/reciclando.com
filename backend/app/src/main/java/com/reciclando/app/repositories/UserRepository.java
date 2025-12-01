package com.reciclando.app.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();
    User findById(long id);
}

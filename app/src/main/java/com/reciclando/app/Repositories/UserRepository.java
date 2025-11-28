package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.User;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();
    User findById(long id);
}

package com.reciclando.app.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Post;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findAll();
    Post findById(long id);
}

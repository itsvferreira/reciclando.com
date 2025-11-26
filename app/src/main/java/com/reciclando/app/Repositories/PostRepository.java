package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Post;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findAll();
    Post findById(long id);
}

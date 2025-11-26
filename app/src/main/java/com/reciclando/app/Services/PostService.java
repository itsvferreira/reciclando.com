package com.reciclando.app.Services;

import org.springframework.stereotype.Service;

import com.reciclando.app.Repositories.PostRepository;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    

}

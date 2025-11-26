package com.reciclando.app.repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.models.Recycler;

public interface RecyclerRepository extends CrudRepository<Recycler, Long> {
}

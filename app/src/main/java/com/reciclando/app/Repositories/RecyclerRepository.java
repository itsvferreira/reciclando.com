package com.reciclando.app.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.reciclando.app.Models.Recycler;

public interface RecyclerRepository extends CrudRepository<Recycler, Long> {
}

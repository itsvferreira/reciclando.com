package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reciclando.app.Models.Recycler;

@Repository
public interface RecyclerRepository extends JpaRepository<Recycler, Long> {
    
    @Query("SELECT r FROM Recycler r JOIN r.acceptedMaterials m WHERE m = :material")
    List<Recycler> findByAcceptedMaterialsContaining(@Param("material") String material);
}
package com.reciclando.app.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.enums.Material;

@Repository
public interface RecyclerRepository extends JpaRepository<Recycler, Long> {
    
    @Query("SELECT DISTINCT r FROM Recycler r JOIN r.acceptedMaterials m WHERE m = :material")
    List<Recycler> findByAcceptedMaterialsContaining(@Param("material") Material material);
    
    @Query("SELECT r FROM Recycler r WHERE r.user.address.city = :city")
    List<Recycler> findByCity(@Param("city") String city);
    
    @Query("SELECT DISTINCT r FROM Recycler r JOIN r.acceptedMaterials m WHERE r.user.address.city = :city AND m = :material")
    List<Recycler> findByCityAndMaterial(@Param("city") String city, @Param("material") Material material);
}
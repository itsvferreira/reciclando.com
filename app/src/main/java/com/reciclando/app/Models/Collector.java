package com.reciclando.app.Models;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "collectors")
public class Collector extends User {

    private String acceptMaterial; 

    @ElementCollection
    private List<String> materialList; 

    private Boolean available; 

    public String getAcceptMaterial() {
        return acceptMaterial;
    }

    public void setAcceptMaterial(String acceptMaterial) {
        this.acceptMaterial = acceptMaterial;
    }

    public List<String> getMaterialList() {
        return materialList;
    }

    public void setMaterialList(List<String> materialList) {
        this.materialList = materialList;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}

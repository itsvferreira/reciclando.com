package com.reciclando.app.Controllers.v1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/como-reciclar")
public class ComoReciclarController {

    @GetMapping
    public String comoReciclar(){
        return "Aqui você aprende como reciclar corretamente.";
    }
}

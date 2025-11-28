package com.reciclando.app.Controllers.v1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/home")
public class HomeController {
    
    @GetMapping
    public String Home(){
        return "Bem-vindo ao Reciclando.com";
    }

    @GetMapping("/status")
    public String status(){
         return "API está online!";
    }

}

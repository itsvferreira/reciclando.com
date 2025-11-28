package com.reciclando.app;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.reciclando.app.Models.Address;
import com.reciclando.app.Models.Donor;
import com.reciclando.app.Models.Post;
import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.User;
import com.reciclando.app.Models.enums.AccountType;
import com.reciclando.app.Models.enums.Material;
import com.reciclando.app.Repositories.AddressRepository;
import com.reciclando.app.Repositories.DonorRepository;
import com.reciclando.app.Repositories.PostRepository;
import com.reciclando.app.Repositories.RecyclerRepository;

@SpringBootApplication
public class AppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(
            PostRepository postRepo,
            DonorRepository donorRepo,
            RecyclerRepository recyclerRepo,
            AddressRepository addressRepo) {
        return args -> {

            // ADDRESS
            Address donorAddress = new Address("12345-678", "Sample City", "SC");
            addressRepo.save(donorAddress);
            Address recyclerAddress = new Address("98765-432", "Example Town", "ET");
            addressRepo.save(recyclerAddress);
            Address poaAddress = new Address("90000-000", "Porto Alegre", "RS");
            addressRepo.save(poaAddress);

            // DONOR
            User donorUser = new User("John", "Doe", "1234567890", AccountType.DONOR);
            donorUser.setAddress(donorAddress);
            Donor donor = new Donor(donorUser);

            // RECYCLER
            User recyclerUser = new User("Jane", "Smith", "0987654321", AccountType.RECYCLER);
            recyclerUser.setAddress(recyclerAddress);
            List<Material> materials = List.of(Material.PAPER, Material.PLASTIC);
            Recycler recycler = new Recycler(recyclerUser, materials);

            User poaUser = new User("Carlos", "Silva", "51999999999", AccountType.RECYCLER);
            poaUser.setAddress(poaAddress);

            List<Material> sameMaterials = List.of(Material.PAPER);
            Recycler recyclerPoa = new Recycler(poaUser, sameMaterials);

            // POSTS
            Post post = new Post(
                    "Old Newspaper",
                    "Bundle of old newspapers available for recycling.",
                    donor,
                    Material.PAPER);
            post.setLocation(donorAddress);

            // Save to repositories
            donorRepo.save(donor);
            recyclerRepo.save(recycler);
            recyclerRepo.save(recyclerPoa);
            postRepo.save(post);
        };
    }

}

package com.reciclando.app;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.reciclando.app.models.Address;
import com.reciclando.app.models.Donor;
import com.reciclando.app.models.Post;
import com.reciclando.app.models.Recycler;
import com.reciclando.app.models.User;
import com.reciclando.app.models.enums.AccountType;
import com.reciclando.app.models.enums.Material;
import com.reciclando.app.repositories.DonorRepository;
import com.reciclando.app.repositories.PostRepository;
import com.reciclando.app.repositories.RecyclerRepository;
import com.reciclando.app.repositories.UserRepository;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	CommandLineRunner seedData(
			UserRepository userRepo,
			PostRepository postRepo,
			DonorRepository donorRepo,
			RecyclerRepository recyclerRepo) {
		return args -> {

			// ADDRESS
			Address donorAddress = new Address("12345-678", "Sample City", "SC");
			Address recyclerAddress = new Address("98765-432", "Example Town", "ET");

			// USER - DONOR
			User donorUser = new User("John", "Doe", "1234567890", AccountType.DONOR);
			donorUser.setAddress(donorAddress);
			Donor donor = new Donor(donorUser);

			// USER - RECYCLER
			User recyclerUser = new User("Jane", "Smith", "0987654321", AccountType.RECYCLER);
			recyclerUser.setAddress(recyclerAddress);
			List<Material> materials = List.of(Material.PAPER, Material.PLASTIC);
			Recycler recycler = new Recycler(recyclerUser, materials);

			// POST by DONOR
			Post post = new Post(
					"Old Newspaper",
					"Bundle of old newspapers available for recycling.",
					donor,
					Material.PAPER);
			post.setLocation(donorAddress);

			// Save to repositories
			userRepo.save(donorUser);
			userRepo.save(recyclerUser);
			donorRepo.save(donor);
			recyclerRepo.save(recycler);
			postRepo.save(post);
		};
	}

}

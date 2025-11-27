package com.reciclando.app;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.reciclando.app.Models.Address;
import com.reciclando.app.Models.Donor;
import com.reciclando.app.Models.Ad;
import com.reciclando.app.Models.Recycler;
import com.reciclando.app.Models.User;
import com.reciclando.app.Models.enums.AccountType;
import com.reciclando.app.Models.enums.Material;
import com.reciclando.app.Repositories.AddressRepository;
import com.reciclando.app.Repositories.DonorRepository;
import com.reciclando.app.Repositories.AdRepository;
import com.reciclando.app.Repositories.RecyclerRepository;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	CommandLineRunner seedData(
			AdRepository postRepo,
			DonorRepository donorRepo,
			RecyclerRepository recyclerRepo,
			AddressRepository addressRepo) {
		return args -> {

			// ADDRESS
			Address donorAddress = new Address("12345-678", "Sample City", "SC", "Central District");
			addressRepo.save(donorAddress);
			Address recyclerAddress = new Address("98765-432", "Example Town", "ET", "Green Neighborhood");
			addressRepo.save(recyclerAddress);

			// DONOR
			User donorUser = new User("John", "Doe", "1234567890", AccountType.DONOR);
			donorUser.setAddress(donorAddress);
			Donor donor = new Donor(donorUser);

			// RECYCLER
			User recyclerUser = new User("Jane", "Smith", "0987654321", AccountType.RECYCLER);
			recyclerUser.setAddress(recyclerAddress);
			List<Material> materials = List.of(Material.PAPER, Material.PLASTIC);
			Recycler recycler = new Recycler(recyclerUser, materials);

			// ADS
			Ad ad1 = new Ad(
					"Old Newspaper",
					"Bundle of old newspapers available for recycling.",
					donor,
					Material.PAPER);
			ad1.setLocation(donorAddress);

			Ad ad2 = new Ad(
					"Plastic Bottles",
					"Collection of used plastic bottles.",
					donor,
					Material.PLASTIC);
			ad2.setLocation(donorAddress);

			Ad ad3 = new Ad(
					"Glass Jars",
					"Several glass jars ready for recycling.",
					donor,
					Material.GLASS);
			ad3.setLocation(donorAddress);

			// Save to repositories
			donorRepo.save(donor);
			recyclerRepo.save(recycler);
			postRepo.saveAll(List.of(ad1, ad2, ad3));
		};
	}

}

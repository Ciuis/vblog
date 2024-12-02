package ru.ciuis.vblog;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.ciuis.vblog.config.RSAKeyProperties;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Authority;
import ru.ciuis.vblog.repository.AppUserRepository;
import ru.ciuis.vblog.repository.AuthorityRepository;
import ru.ciuis.vblog.service.AppUserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableConfigurationProperties(RSAKeyProperties.class)
public class App extends SpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner run(AuthorityRepository authRepo, AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Authority r = authRepo.save(new Authority(1L, "USER"));
            Set<Authority> authorities = new HashSet<>();

            authorities.add(r);

            AppUser u = new AppUser();
            u.setAuthorities(authorities);
            u.setFirstName("Manuel");
            u.setLastName("Sanchez");
            u.setEmail("tmv87ei@cloudtempmail.net");
            u.setUsername("manuel213452");
            u.setPhone("9611000000");
            u.setPassword(passwordEncoder.encode("password123"));
            u.setIsVerified(true);

            userRepository.save(u);
        };
    }
}

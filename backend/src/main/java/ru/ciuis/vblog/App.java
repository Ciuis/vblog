package ru.ciuis.vblog;

import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Authority;
import ru.ciuis.vblog.repository.AppUserRepository;
import ru.ciuis.vblog.repository.AuthorityRepository;
import ru.ciuis.vblog.service.AppUserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App extends SpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner run(AuthorityRepository authRepo, AppUserService userService) {
        return args -> {
            authRepo.save(new Authority(1L, "USER"));
/*            AppUser u = new AppUser();
            u.setFirstname("Unknown");
            u.setLastname("Coder");
            userService.registerUser(u);*/
        };
    }
}

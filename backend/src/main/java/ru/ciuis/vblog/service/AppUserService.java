package ru.ciuis.vblog.service;

import ru.ciuis.vblog.exception.EmailTakenException;
import ru.ciuis.vblog.exception.UserNotExistException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Authority;
import ru.ciuis.vblog.model.RegistrationForm;
import ru.ciuis.vblog.repository.AppUserRepository;
import ru.ciuis.vblog.repository.AuthorityRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

@Service
public class AppUserService {
    private final AppUserRepository userRepository;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AppUserService(AppUserRepository userRepository, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
    }

    public AppUser getUserByName(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);
    }

    public AppUser updateUser(AppUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailTakenException();
        }
    }

    public AppUser registerUser(RegistrationForm registrationForm) {
        AppUser user = new AppUser();

        user.setFirstname(registrationForm.getFirstname());
        user.setLastname(registrationForm.getLastname());

        String name = user.getFirstname() + user.getLastname();
        boolean isTaken = true;
        String tmpName = "";

        while (isTaken) {
            tmpName = generateUsername(name);
            if (userRepository.findByUsername(tmpName).isEmpty()) {
                isTaken = false;
            }
        }

        user.setUsername(tmpName);
        user.setEmail(registrationForm.getEmail());
        user.setBirthDate(registrationForm.getBirthdate());
        Set<Authority> authorities = user.getAuthorities();

        authorities.add(authorityRepository.findByAuthority("USER").get());
        user.setAuthorities(authorities);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailTakenException();
        }
    }

    public void generateVerificationCode(String username) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);

        user.setVerification(generateVerificationCode());

        userRepository.save(user);
    }

    private String generateUsername(String name) {
        long num = (long)Math.floor(Math.random() * 1_000_000_000);
        return name + num;
    }

    private Long generateVerificationCode() {
        return (long)Math.floor(Math.random() * 1_000_000);
    }
}

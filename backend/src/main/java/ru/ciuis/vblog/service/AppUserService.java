package ru.ciuis.vblog.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import ru.ciuis.vblog.exception.EmailSendException;
import ru.ciuis.vblog.exception.EmailTakenException;
import ru.ciuis.vblog.exception.FailedVerificationException;
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
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppUserService(AppUserRepository userRepository,
                          AuthorityRepository authorityRepository,
                          MailService mailService,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
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

        user.setFirstName(registrationForm.getFirstName());
        user.setLastName(registrationForm.getLastName());

        String name = user.getFirstName() + user.getLastName();
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
        user.setBirthDate(registrationForm.getBirthDate());
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

        try {
            mailService.sendMail(user.getEmail(), "Verification code", "Your verification code: " + user.getVerification());
            userRepository.save(user);
        } catch (Exception e) {
            throw new EmailSendException();
        }

        userRepository.save(user);
    }

    public AppUser verifyEmail(String username, Long code) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);

        if (code.equals(user.getVerification())) {
            user.setIsVerified(true);
            user.setVerification(null);
            return userRepository.save(user);
        } else {
            throw new FailedVerificationException();
        }
    }

    public AppUser setPassword(String username, String password) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);
        String encodedPassword = passwordEncoder.encode(password);

        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    private String generateUsername(String name) {
        long num = (long)Math.floor(Math.random() * 1_000_000_000);
        return name + num;
    }

    private Long generateVerificationCode() {
        return (long)Math.floor(Math.random() * 1_000_000);
    }

}

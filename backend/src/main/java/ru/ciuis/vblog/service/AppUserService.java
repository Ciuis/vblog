package ru.ciuis.vblog.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import ru.ciuis.vblog.exception.*;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.Authority;
import ru.ciuis.vblog.model.Image;
import ru.ciuis.vblog.model.RegistrationForm;
import ru.ciuis.vblog.repository.AppUserRepository;
import ru.ciuis.vblog.repository.AuthorityRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    @Autowired
    public AppUserService(AppUserRepository userRepository,
                          AuthorityRepository authorityRepository,
                          MailService mailService,
                          PasswordEncoder passwordEncoder,
                          ImageService imageService) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
        this.imageService = imageService;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser u = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities = u.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());

        return new User(u.getUsername(), u.getPassword(), authorities);
    }

    public AppUser setProfileBannerPicture(String username, MultipartFile file, String prefix)
            throws UnableToSavePhotoException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserNotExistException::new);

        Image image = imageService.uploadImage(file, prefix);

        if (prefix.equals("pimg")) {
            user.setProfilePicture(image);
        } else {
            user.setBannerPicture(image);
        }

        return userRepository.save(user);
    }
}

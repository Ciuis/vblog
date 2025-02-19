package ru.ciuis.vblog.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import ru.ciuis.vblog.dto.FindUsernameDTO;
import ru.ciuis.vblog.dto.PasswordCodeDTO;
import ru.ciuis.vblog.exception.EmailSendException;
import ru.ciuis.vblog.exception.EmailTakenException;
import ru.ciuis.vblog.exception.FailedVerificationException;
import ru.ciuis.vblog.exception.UserNotExistException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.LoginResponse;
import ru.ciuis.vblog.model.RegistrationForm;
import ru.ciuis.vblog.service.AppUserService;
import ru.ciuis.vblog.service.MailService;
import ru.ciuis.vblog.service.TokenService;
import ru.ciuis.vblog.exception.InvalidCredentialsException;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    private final AppUserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final MailService emailService;

    @Autowired
    public AuthenticationController(AppUserService userService,
                                    TokenService tokenService,
                                    AuthenticationManager authenticationManager,
                                    MailService emailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @ExceptionHandler({EmailTakenException.class})
    public ResponseEntity<String> handleEmailTaken() {
        return new ResponseEntity<String>("This email already taken.", HttpStatus.CONFLICT);
    }

    //goto http://localhost:8000/auth/register
    @PostMapping("/register")
    public AppUser registerUser(@RequestBody RegistrationForm registrationForm) {
        return userService.registerUser(registrationForm);
    }

    @ExceptionHandler({UserNotExistException.class})
    public ResponseEntity<String> handleUserNotExist() {
        return new ResponseEntity<String>("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    //goto http://localhost:8000/auth/update/phone
    @PutMapping("/update/phone")
    public AppUser updatePhone(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String phone = body.get("phone");

        AppUser user = userService.getUserByName(username);
        user.setPhone(phone);

        return userService.updateUser(user);
    }

    @ExceptionHandler({EmailSendException.class})
    public ResponseEntity<String> handleEmailFailed() {
        return new ResponseEntity<String>("Email failed to send", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //goto http://localhost:8000/auth/email/verification
    @PostMapping("/email/verification")
    public ResponseEntity<String> createVerificationCode(@RequestBody LinkedHashMap<String, String> body) {
        userService.generateVerificationCode(body.get("username"));

        return new ResponseEntity<String>("Verification code sent by email", HttpStatus.OK);
    }

    @ExceptionHandler({FailedVerificationException.class})
    public ResponseEntity<String> handlerFailedVerification() {
        return new ResponseEntity<String>("Verification code is not correct", HttpStatus.CONFLICT);
    }

    @PostMapping("/email/verify")
    public AppUser verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        Long code = Long.parseLong(body.get("code"));
        String username = body.get("username");

        return userService.verifyEmail(username, code);
    }

    @PutMapping("/update/password")
    public AppUser updatePassword(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return userService.setPassword(username, password);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String, String> body) throws InvalidCredentialsException {
        String username = body.get("username");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            String token = tokenService.generateToken(auth);
            return new LoginResponse(userService.getUserByName(username), token);
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }

    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCredentials() {
        return new ResponseEntity<String>("Invalid credentials", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/find")
    public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameDTO credential) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        String username = userService.verifyUsername(credential);

        return new ResponseEntity<String>(username, HttpStatus.OK);
    }

    @PostMapping("/identifiers")
    public FindUsernameDTO findIdentifiers(@RequestBody FindUsernameDTO credential) {
        AppUser user = userService.getUsersEmailAndPhone(credential);

        return new FindUsernameDTO(user.getEmail(), user.getPhone(), user.getUsername());
    }

    @PostMapping("/password/code")
    public ResponseEntity<String> retrievePasswordCode(@RequestBody PasswordCodeDTO body) throws EmailSendException {
        String email = body.getEmail();
        int code = body.getCode();
        emailService.sendMail(email, "Your password reset code", ""+code);

        return new ResponseEntity<String>("Code sent successfully", HttpStatus.OK);
    }
}

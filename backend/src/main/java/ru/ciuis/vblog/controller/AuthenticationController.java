package ru.ciuis.vblog.controller;

import org.springframework.http.HttpStatus;
import ru.ciuis.vblog.exception.EmailTakenException;
import ru.ciuis.vblog.exception.UserNotExistException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.model.RegistrationForm;
import ru.ciuis.vblog.service.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AppUserService userService;

    @Autowired
    public AuthenticationController(AppUserService userService) {
        this.userService = userService;
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

    @PutMapping("/update/phone")
    public AppUser updatePhone(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String phone = body.get("phone");

        AppUser user = userService.getUserByName(username);
        user.setPhone(phone);

        return userService.updateUser(user);
    }

    @PostMapping("/email/verification")
    public ResponseEntity<String> createVerificationCode(@RequestBody LinkedHashMap<String, String> body) {
        userService.generateVerificationCode(body.get("username"));

        return new ResponseEntity<String>("Verification code sent by email", HttpStatus.OK);
    }
}

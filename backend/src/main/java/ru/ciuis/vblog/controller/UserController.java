package ru.ciuis.vblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.common.net.HttpHeaders;
import org.springframework.web.multipart.MultipartFile;


import ru.ciuis.vblog.exception.UnableToSavePhotoException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.service.AppUserService;
import ru.ciuis.vblog.service.ImageService;
import ru.ciuis.vblog.service.TokenService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final AppUserService userService;
    private final TokenService tokenService;
    private final ImageService imageService;

    @Autowired
    public UserController(AppUserService userService, TokenService tokenService, ImageService imageService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.imageService = imageService;
    }

    @GetMapping("/verify")
    public AppUser verifyAuthority(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String username = tokenService.getUsernameFromToken(token);

        return userService.getUserByName(username);
    }

    @PostMapping("/pimg")
    public AppUser uploadProfilePicture(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("image") MultipartFile file)
            throws UnableToSavePhotoException {
        String username = tokenService.getUsernameFromToken(token);

        return userService.setProfileBannerPicture(username, file, "pimg");
    }

    @PostMapping("/banner")
    public AppUser uploadBannerPicture(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("image") MultipartFile file)
            throws UnableToSavePhotoException {
        String username = tokenService.getUsernameFromToken(token);

        return userService.setProfileBannerPicture(username, file, "bnr");
    }
}

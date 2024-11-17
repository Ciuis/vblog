package ru.ciuis.vblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.common.net.HttpHeaders;
import org.springframework.web.multipart.MultipartFile;


import ru.ciuis.vblog.exception.FollowException;
import ru.ciuis.vblog.exception.UnableToSavePhotoException;
import ru.ciuis.vblog.model.AppUser;
import ru.ciuis.vblog.service.AppUserService;
import ru.ciuis.vblog.service.ImageService;
import ru.ciuis.vblog.service.TokenService;

import java.util.LinkedHashMap;
import java.util.Set;

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

    @PutMapping("/")
    public AppUser updateUser(@RequestBody AppUser u) {
        return userService.updateUser(u);
    }

    @ExceptionHandler({FollowException.class})
    public ResponseEntity<String> handleFollowException() {
        return new ResponseEntity<String>("User cannot follow themselves", HttpStatus.FORBIDDEN);
    }

    @PutMapping("/follow")
    public Set<AppUser> followUser(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody LinkedHashMap<String, String> body) throws FollowException {
        String loggedInUser = tokenService.getUsernameFromToken(token);
        String followedUser = body.get("followedUser");

        return userService.followUser(loggedInUser, followedUser);
    }

    @GetMapping("/following/{username}")
    public Set<AppUser> getFollowingList(@PathVariable("username") String username) {
        return userService.retrieveFollowingList(username);
    }

    @GetMapping("/followers/{username}")
    public Set<AppUser> getFollowersList(@PathVariable("username") String username) {
        return userService.retrieveFollowersList(username);
    }
}

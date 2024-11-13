package ru.ciuis.vblog.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResponse {
    private AppUser user;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(AppUser user, String token) {
        this.user = user;
        this.token = token;
    }
}

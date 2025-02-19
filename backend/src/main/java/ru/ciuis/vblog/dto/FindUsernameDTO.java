package ru.ciuis.vblog.dto;

import lombok.ToString;

@ToString
public class FindUsernameDTO {
    private String email;
    private String phone;
    private String username;

    public FindUsernameDTO() {
    }

    public FindUsernameDTO(String email, String phone, String username) {
        this.email = email;
        this.phone = phone;
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

package ru.ciuis.vblog.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class RegistrationForm {
    private String firstName;
    private String lastName;
    private String email;
    private Date birthDate;

    public RegistrationForm() {
    }

    public RegistrationForm(String firstName, String lastName, String email, Date birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
    }
}

package ru.ciuis.vblog.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class RegistrationForm {
    private String firstname;
    private String lastname;
    private String email;
    private Date birthdate;

    public RegistrationForm() {
    }

    public RegistrationForm(String firstname, String lastname, String email, Date birthdate) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthdate = birthdate;
    }
}

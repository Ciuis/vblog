package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone_num")
    private String phone;

    @Column(name = "birthdate")
    private Date birthDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_authority_junc",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Authority> authorities;

    private Boolean isVerified;

    @Column(nullable = true)
    @JsonIgnore
    private Long verification;

    public AppUser() {
        this.authorities = new HashSet<>();
        this.isVerified = false;
    }

}

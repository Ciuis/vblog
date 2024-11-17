package ru.ciuis.vblog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

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

    private String bio;
    private String nickname;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_picture", referencedColumnName="image_id")
    private Image profilePicture;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "banner_picture", referencedColumnName="image_id")
    private Image bannerPicture;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="following",
            joinColumns={@JoinColumn(name="user_id")},
            inverseJoinColumns={@JoinColumn(name="following_id")}
    )
    @JsonIgnore
    private Set<AppUser> following;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="followers",
            joinColumns={@JoinColumn(name="user_id")},
            inverseJoinColumns={@JoinColumn(name="follower_id")}
    )
    @JsonIgnore
    private Set<AppUser> followers;

    /* Securuty related */
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
        this.following = new HashSet<>();
        this.followers = new HashSet<>();
        this.isVerified = false;
    }

    @Override
    public String toString() {
        return "AppUser{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", birthDate=" + birthDate +
                ", bio='" + bio + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profilePicture=" + profilePicture +
                ", bannerPicture=" + bannerPicture +
                ", following=" + following.size() +
                ", followers=" + followers.size() +
                ", authorities=" + authorities +
                ", isVerified=" + isVerified +
                ", verification=" + verification +
                '}';
    }
}

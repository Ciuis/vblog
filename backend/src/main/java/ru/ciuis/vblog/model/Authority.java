package ru.ciuis.vblog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "authority")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    private String authority;

    public Authority() {
        
    }

    public Authority(Long id, String authority) {
        this.id = id;
        this.authority = authority;
    }

}

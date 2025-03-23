package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;
    private String name_user;
    @Column(unique = true, nullable = false)
    private String email_user;
    private String password_user;

    public User(String name_user, String email_user, String password_user) {
        this.name_user = name_user;
        this.email_user = email_user;
        this.password_user = password_user;
    }
}
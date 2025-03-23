package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "licence")
@Getter
@Setter
@NoArgsConstructor

public class licence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_license;
    private String name_license;

    public licence(String name_license) {
        this.name_license = name_license;
    }
}

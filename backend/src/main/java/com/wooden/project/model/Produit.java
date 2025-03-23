package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "produit")
@Getter
@Setter
@NoArgsConstructor

public class Produit {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id_produit;
    @ManyToOne
    @JoinColumn(name = "license_id", referencedColumnName = "id_license")
    private licence licence_id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_user")
    private User user_id;
    @Enumerated(EnumType.STRING)
    private Taille taille;    private String modele;

    public Produit(licence licence_id, User user_id, Taille taille, String modele) {
        this.licence_id = licence_id;
        this.user_id = user_id;
        this.taille = taille;
        this.modele = modele;
    }

}

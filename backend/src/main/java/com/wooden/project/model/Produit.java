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
    private licence licence;
    @Enumerated(EnumType.STRING)
    private Taille taille;

    private String modele;

    public Produit(licence licence, Taille taille, String modele) {
        this.licence = licence;
        this.taille = taille;
        this.modele = modele;
    }

}

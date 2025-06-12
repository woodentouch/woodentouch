package com.wooden.project.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
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
    @JsonManagedReference
    private licence licence_id;


    @Convert(converter = Taille.TailleConverter.class)
    private Taille taille;
    
    private String modele;

    public Produit(licence licence_id, Taille taille, String modele) {
        this.licence_id = licence_id;
        this.taille = taille;
        this.modele = modele;
    }

    public String getModele() {
        return modele;
    }

    public Taille getTaille() {
        return taille;
    }

    public licence getLicence_id() {
        return licence_id;
    }
}

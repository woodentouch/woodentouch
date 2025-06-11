package com.wooden.project.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "panier_items")
@Getter
@Setter
@NoArgsConstructor
public class PanierItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_panier_item;

    @ManyToOne
    @JoinColumn(name = "id_panier", referencedColumnName = "id_panier")
    @JsonBackReference
    private Panier panier;

    @ManyToOne
    @JoinColumn(name = "id_produit", referencedColumnName = "id_produit")
    private Produit produit;

    private Integer quantite = 1;

    private Double prix_unitaire;

    public PanierItem(Panier panier, Produit produit, Integer quantite, Double prix_unitaire) {
        this.panier = panier;
        this.produit = produit;
        this.quantite = quantite;
        this.prix_unitaire = prix_unitaire;
    }
}

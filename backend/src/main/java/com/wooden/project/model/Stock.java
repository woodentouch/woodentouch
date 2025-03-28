package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stock")
@Getter
@Setter
@NoArgsConstructor

public class Stock {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id_stock;
    @ManyToOne
    @JoinColumn(name = "id_produit", referencedColumnName = "id_produit")
    private Produit id_produit;
    private int quantite;

    public Stock(Produit id_produit, int quantite) {
        this.id_produit = id_produit;
        this.quantite = quantite;
    }
}

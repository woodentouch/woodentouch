package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ventes")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Ventes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVente;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private Produit product;

    private Integer nombreVentes;

    private Double prixTotal;

    public Ventes(Produit product, Integer nombreVentes, Double prixTotal) {
        this.product = product;
        this.nombreVentes = nombreVentes;
        this.prixTotal = prixTotal;
    }
}

package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "panier")
@Getter
@Setter
@NoArgsConstructor

public class Panier {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id_panier;
    @ManyToOne
    @JoinColumn(name="id_produit" , referencedColumnName = "id_produit")
    private Produit produit;
    @Temporal(TemporalType.DATE)
    private Date date_ajout;

    public Panier(Produit produit, Date date_ajout) {
        this.produit = produit;
        this.date_ajout = date_ajout;
    }
}

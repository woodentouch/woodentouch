package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.wooden.project.model.User;

/**
 * Panier représente un panier d'achat appartenant à un utilisateur.
 */

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

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_user")
    private User user;
    @Temporal(TemporalType.DATE)
    private Date date_ajout;

    public Panier(Produit produit, User user, Date date_ajout) {
        this.produit = produit;
        this.user = user;
        this.date_ajout = date_ajout;
    }
}

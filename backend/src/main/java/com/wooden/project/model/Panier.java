package com.wooden.project.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.wooden.project.model.User;
import com.wooden.project.model.evenement;
import java.util.List;
import com.wooden.project.model.PanierItem;

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

    @OneToMany(mappedBy = "panier", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PanierItem> items;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_user")
    private User user;

    private String mode_paiement;

    private Double prix_panier;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private evenement event;
    @Temporal(TemporalType.DATE)
    private Date date_ajout;

    public Panier(User user, Date date_ajout, String mode_paiement, Double prix_panier, evenement event) {
        this.user = user;
        this.date_ajout = date_ajout;
        this.mode_paiement = mode_paiement;
        this.prix_panier = prix_panier;
        this.event = event;
    }
}

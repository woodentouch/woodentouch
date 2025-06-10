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
    @Temporal(TemporalType.DATE)
    @Column(name = "date_ajout")
    private Date dateAjout;

    @Column(name = "mode_paiement")
    private String modePaiement;

    @Column(name = "prix_panier")
    private Double prixPanier;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private evenement event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Panier(Date dateAjout, String modePaiement, Double prixPanier, evenement event, User user) {
        this.dateAjout = dateAjout;
        this.modePaiement = modePaiement;
        this.prixPanier = prixPanier;
        this.event = event;
        this.user = user;
    }
}

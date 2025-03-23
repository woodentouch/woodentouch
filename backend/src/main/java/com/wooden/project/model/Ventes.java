package com.wooden.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

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

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    private Double prix;

    private String modeDePaiement;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private evenement event;

    public Ventes(Produit product, User user, Double prix, String modeDePaiement, Date date, evenement event) {
        this.product = product;
        this.user = user;
        this.prix = prix;
        this.modeDePaiement = modeDePaiement;
        this.date = date;
        this.event = event;
    }
}

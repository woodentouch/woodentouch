package com.wooden.project.repository;

import com.wooden.project.model.PanierItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanierItemRepository extends JpaRepository<PanierItem, Long> {

    /**
     * Récupère les items d'un panier à partir de l'identifiant du panier.
     * <p>
     * Le nom de la colonne dans l'entité {@code Panier} est {@code id_panier} ce qui
     * rend la convention de nommage automatique de Spring Data difficile à
     * utiliser. On définit donc explicitement la requête JPQL afin d'éviter les
     * erreurs de résolution de propriété lors du démarrage de l'application.
     *
     * @param idPanier identifiant du panier
     * @return liste des {@link PanierItem} liés au panier
     */
    @Query("SELECT pi FROM PanierItem pi WHERE pi.panier.id_panier = :idPanier")
    List<PanierItem> findByPanierId(@Param("idPanier") Long idPanier);

    @Query("SELECT AVG(pi.prix_unitaire) FROM PanierItem pi WHERE pi.produit.id_produit = :productId")
    Double getAveragePriceByProductId(@Param("productId") Long productId);
}

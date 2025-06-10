package com.wooden.project.repository;

import com.wooden.project.model.PanierItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanierItemRepository extends JpaRepository<PanierItem, Long> {
    List<PanierItem> findByPanier_Id_panier(Long idPanier);
}

package com.wooden.project.repository;

import com.wooden.project.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PanierRepo extends JpaRepository<Panier, Long> {

}

package com.wooden.project.repository;

import com.wooden.project.model.Ventes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenteRepo extends JpaRepository<Ventes,Long> {
}

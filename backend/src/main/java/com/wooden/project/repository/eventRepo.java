package com.wooden.project.repository;

import com.wooden.project.model.evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface eventRepo extends JpaRepository<evenement, Long> {
}

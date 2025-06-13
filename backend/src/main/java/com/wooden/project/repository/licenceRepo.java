package com.wooden.project.repository;

import com.wooden.project.model.licence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface licenceRepo extends JpaRepository<licence, Long> {
    java.util.Optional<licence> findByNameLicense(String name_license);
}

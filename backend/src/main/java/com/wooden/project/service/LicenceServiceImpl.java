package com.wooden.project.service;

import com.wooden.project.model.licence;
import com.wooden.project.repository.licenceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class LicenceServiceImpl extends BaseServiceImpl<licence,Long> implements LicenceService {
    @Autowired
    private licenceRepo licenceRepository;
    @Override
    public JpaRepository<licence, Long> getRepository() {
        return licenceRepository;
    }
}

package com.wooden.project.controller;

import com.wooden.project.model.licence;
import com.wooden.project.service.LicenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/licences")
public class licenceController {
    private final LicenceService licenceService;
    public licenceController (LicenceService licenceService) {
        this.licenceService = licenceService;
    }
    @GetMapping
    public List<licence> getAllLicences() {
        return licenceService.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<licence> getLicenceById(@PathVariable Long id) {
        Optional<licence> licence = licenceService.findById(id);
        return licence.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public licence createLicence(@RequestBody licence licence) {
        return licenceService.save(licence);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicence(@PathVariable Long id) {
        licenceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

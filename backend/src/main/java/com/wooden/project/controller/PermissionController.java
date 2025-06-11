package com.wooden.project.controller;

import com.wooden.project.model.Permission;
import com.wooden.project.repository.PermissionRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {
    private final PermissionRepo permissionRepo;

    public PermissionController(PermissionRepo permissionRepo) {
        this.permissionRepo = permissionRepo;
    }

    @GetMapping
    public List<Permission> getPermissions() {
        List<Permission> all = permissionRepo.findAll();
        Map<Long, Permission> map = new LinkedHashMap<>();
        List<Permission> roots = new ArrayList<>();
        // prepare map and clear children
        for (Permission p : all) {
            p.setChildren(new ArrayList<>());
            map.put(p.getId(), p);
        }
        // build tree
        for (Permission p : all) {
            Long parentId = p.getParentId();
            if (parentId != null && map.containsKey(parentId)) {
                map.get(parentId).getChildren().add(p);
            } else {
                roots.add(p);
            }
        }
        return roots;
    }

    @PostMapping
    public ResponseEntity<Permission> create(@RequestBody Permission permission) {
        permission.setId(null);
        Permission saved = permissionRepo.save(permission);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Permission> update(@PathVariable Long id, @RequestBody Permission permission) {
        if (!permissionRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        permission.setId(id);
        Permission saved = permissionRepo.save(permission);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!permissionRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        permissionRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

package com.wooden.project.service;

import com.wooden.project.model.User;
import java.util.Optional;

public interface UserService extends BaseService<User, Long> {
    Optional<User> findByEmail(String email);
    boolean authenticate(String email, String password);
}

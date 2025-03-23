package com.wooden.project.service;


import com.wooden.project.model.User;
import com.wooden.project.repository.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

@Service
public class UserServiceImpl extends BaseServiceImpl<User, Long> implements UserService {

    @Autowired
    private UserRepo userRepository;

    @Override
    protected JpaRepository<User, Long> getRepository() {
        return userRepository;
    }

}

package com.wooden.project.controller;

import com.wooden.project.dto.Result;
import com.wooden.project.dto.SignInRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public Result<Map<String, Object>> signin(@RequestBody SignInRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String, Object> user = new HashMap<>();
        user.put("id", 1);
        user.put("username", userDetails.getUsername());
        user.put("email", userDetails.getUsername() + "@example.com");

        Map<String, Object> data = new HashMap<>();
        data.put("user", user);
        data.put("accessToken", UUID.randomUUID().toString());
        data.put("refreshToken", UUID.randomUUID().toString());

        return Result.success(data);
    }
}

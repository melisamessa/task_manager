package com.melisa_messa.task_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.melisa_messa.task_manager.config.JwtUtil;
import org.springframework.http.HttpStatus;
import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController (UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager){
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        try {
            userService.registerUser(user);
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok("Bearer " + token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
            String token = jwtUtil.generateToken(userDetails.getUsername());
           
            return ResponseEntity.ok("Bearer " + token);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

}

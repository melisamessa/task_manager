package com.melisa_messa.task_manager.controller;

import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.service.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestParam String email, @RequestParam String password){
        return userService.logInUser(email, password);
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(Long id){
        return userService.getUserById(id);
    }

}

package com.melisa_messa.task_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.melisa_messa.task_manager.model.Category;
import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.service.CategoryService;
import com.melisa_messa.task_manager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.*;

@RestController
@RequestMapping("/category")
public class CategoryController {
    
    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public CategoryController(CategoryService categoryService, UserService userService){
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCategory(@RequestBody Category category, @AuthenticationPrincipal UserDetails userDetails){
        try {
            String userEmail = userDetails.getUsername();
            Category createdCategory = categoryService.createCategory(category, userEmail);
            return ResponseEntity.ok("Categoría creada exitosamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error al crear la categoría: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public List<Category> getCategoriesByUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);
        System.out.println("User ID en el controlador: " + user.getId());
        return categoryService.getCategoriesByUser(user.getId());
    }

    @GetMapping("/{id}")
    public Optional<Category> getCategoryById(Long id){
        return categoryService.getCategoryById(id);
    }
}

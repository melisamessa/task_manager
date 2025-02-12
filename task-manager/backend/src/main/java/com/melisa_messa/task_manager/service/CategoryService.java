package com.melisa_messa.task_manager.service;

import com.melisa_messa.task_manager.model.Category;
import com.melisa_messa.task_manager.repository.CategoryRepository;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.repository.UserRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository){
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Category createCategory(com.melisa_messa.task_manager.model.Category category, String userEmail){
        if ( category.getName() == null || category.getName().isEmpty()){
            throw new IllegalArgumentException("El nombre de la categoria es obligatorio");
        }
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        category.setUser(user);
        List<Category> userCategories = getCategoriesByUser(user.getId());
        for (Category c : userCategories) {
            if (category.getName().equals(c.getName())){
                throw new IllegalArgumentException("El nombre de la categoria ya existe");
            }
        }
        return categoryRepository.save(category);
    }

    public List<Category> getCategoriesByUser(Long userId){
        System.out.println("User ID en el servicio: " + userId);
        return categoryRepository.findByUserId(userId);
    }

    public Optional<Category> getCategoryById(Long id){
        return categoryRepository.findById(id);
    }
    
}

package com.melisa_messa.task_manager.controller;

import com.melisa_messa.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.melisa_messa.task_manager.model.Task;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.melisa_messa.task_manager.service.UserService;
import com.melisa_messa.task_manager.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/tasks")

public class TaskController {
    
    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService){
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createTask(@RequestBody Task task, @AuthenticationPrincipal UserDetails userDetails){
        try {
            String userEmail = userDetails.getUsername();
            Task createdTask = taskService.createTask(task, userEmail);
            return ResponseEntity.ok("Tarea creada exitosamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error al crear la tarea:" + e.getMessage());
        }
    }

    @GetMapping("/category/{category_id}")
    public List<Task> getTaskByCategory(@PathVariable("category_id") Long categoryId){
        return taskService.getTaskByCategory(categoryId);
    }

    @GetMapping("/user")
    public List<Task> getTasksByUserId(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails) {
        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);
        System.out.println("User ID en el controlador: " + user.getId());
        return taskService.getTaskByUser(user.getId());
    }

    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable("id") Long id){
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        if (userDetails == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);

        try {
            taskService.updateTask(id, updatedTask, user);
            return ResponseEntity.ok().body("Tarea actualizada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);

        System.out.println("Usuario autenticado: " + user.getEmail());

        taskService.deleteTask(id, user);
        return ResponseEntity.ok().body("Tarea eliminada correctamente");
    }

}

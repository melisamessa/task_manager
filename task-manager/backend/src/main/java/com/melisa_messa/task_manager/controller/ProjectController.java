package com.melisa_messa.task_manager.controller;

import com.melisa_messa.task_manager.service.ProjectService;
import com.melisa_messa.task_manager.service.UserService;
import com.melisa_messa.task_manager.model.Project;
import com.melisa_messa.task_manager.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpRequest;
import java.util.*;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    public ProjectController(ProjectService projectService, UserService userService){
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createProject(@RequestBody Project project, @AuthenticationPrincipal UserDetails userDetails){
        try {
            String userEmail = userDetails.getUsername();
            Project createdProject = projectService.createProject(project, userEmail);
            return ResponseEntity.ok("Projecto creado correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error al crear el projecto" + e.getMessage());
        }
    }

    @GetMapping("/user")
    public List<Project> getProjectsByUserId(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);
        return projectService.getProjectsByUserId(user.getId());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateProject(@PathVariable Long id, @RequestBody Project updatedProject, @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        if (userDetails == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);

        try {
            projectService.updateProject(id, updatedProject, user);
            return ResponseEntity.ok("Projecto editado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id, @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        if (userDetails == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);

        projectService.deleteProject(id, user);
        return ResponseEntity.ok().body("Proyecto eliminado correctamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> markProjectAsComplete(@PathVariable Long id, @AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails){
        if (userDetails == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario no autenticado");
        }

        String userEmail = userDetails.getUsername();
        User user = userService.loadUserByEmail(userEmail);

        try {
            projectService.markProjectComplete(id, user);
            return ResponseEntity.ok("Projecto editado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    
}

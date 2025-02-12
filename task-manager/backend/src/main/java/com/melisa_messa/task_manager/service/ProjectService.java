package com.melisa_messa.task_manager.service;

import com.melisa_messa.task_manager.repository.UserRepository;
import com.melisa_messa.task_manager.repository.ProjectRepository;
import com.melisa_messa.task_manager.model.Project;
import com.melisa_messa.task_manager.model.User;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService (ProjectRepository projectRepository, UserRepository userRepository){
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(Project project, String userEmail){
        if (project.getTitle() == null || project.getTitle().isEmpty()){
            throw new IllegalArgumentException("El título del proyecto no puede ser vacío");
        }

        User user = userRepository.findByEmail(userEmail).orElseThrow(()-> (new RuntimeException("Usuario no encontrado")));
        project.setUser(user);
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByUserId(Long userId){
        return projectRepository.findByUserId(userId);
    }

    public void updateProject(Long id, Project updatedProject, User user){
        if (updatedProject.getTitle() == null || updatedProject.getTitle().trim().isEmpty()){
            throw new RuntimeException("El título del proyecto no puede ser vacío");
        }

        Project existingProject = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Projecto no encontrado"));

        if(!existingProject.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No tienes permiso para editar este proyecto");
        }

        existingProject.setTitle(updatedProject.getTitle());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setComplete(updatedProject.getComplete());
        projectRepository.save(existingProject);
    }

    public void deleteProject(Long id, User user){
        Project project = projectRepository.findById(id).orElseThrow(()->(new RuntimeException("Proyecto no encontrado")));

        if (!project.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No tiene permiso para eliminar este proyecto");
        }

        projectRepository.deleteById(id);
    }

    public void markProjectComplete(Long id, User user){
        Project project = projectRepository.findById(id).orElseThrow(()->(new RuntimeException("Proyecto no encontrado")));
    
        if (!project.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No tiene permiso para editar este proyecto");
        }

        project.setComplete(!project.getComplete());
        projectRepository.save(project);
    }
}

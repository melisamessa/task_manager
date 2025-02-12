package com.melisa_messa.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.model.Project;
import com.melisa_messa.task_manager.model.Task;
import com.melisa_messa.task_manager.repository.TaskRepository;
import com.melisa_messa.task_manager.repository.ProjectRepository;
import com.melisa_messa.task_manager.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository; // Añadido el repositorio UserRepository
    private final ProjectRepository projectRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository; // Inyectado el UserRepository
        this.projectRepository = projectRepository;
    }

    public Task createTask(Task task, String userEmail){
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new IllegalArgumentException("El título de la tarea es obligatorio");
        }
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getTaskByUser(Long userId){
        System.out.println("User ID en el servicio: " + userId);
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }

    public void updateTask(Long id, Task updatedTask, User user) {

        if (updatedTask.getTitle() == null || updatedTask.getTitle().trim().isEmpty()) {
            throw new RuntimeException("El título de la tarea no puede estar vacío");
        }
    
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if (!existingTask.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No tienes permiso para editar esta tarea");
        }
    
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setDueDate(updatedTask.getDueDate());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setStatus(updatedTask.getStatus());        
        taskRepository.save(existingTask);
    }

    public void deleteTask(Long id, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
    
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No tienes permiso para eliminar esta tarea");
        }
    
        taskRepository.deleteById(id);
    }
    
    public Task assignTaskToProject(Long taskId, Long projectId, User user){
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        Project project = projectRepository.findById(projectId)
            .orElseThrow(()-> new RuntimeException("Projecto no encontrado"));

        if ((!task.getUser().getId().equals(user.getId())) || (!project.getUser().getId().equals(user.getId()))){
            throw new RuntimeException("No tienes permiso para realizar los cambios");
        }

        task.setProject(project);
        return taskRepository.save(task);
    }

    public Task unassignTaskToProject(Long taskId, User user){
        Task task = taskRepository.findById(taskId)
            .orElseThrow(()-> new RuntimeException("Tarea no encontrada"));

        if (!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No tienes permiso para realizar los cambios");
        }

        task.setProject(null);
        return taskRepository.save(task);
    }

    public List<Task> getTaskByProjectId(Long projectId, User user){
        Project project = projectRepository.findById(projectId)
            .orElseThrow(()-> new RuntimeException("Projecto no encontrado"));

        if(!project.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No tienes permiso para realizar la acción");
        }
        return taskRepository.findByProjectId(projectId);
    }
}

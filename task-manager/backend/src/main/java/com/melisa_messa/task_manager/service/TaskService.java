package com.melisa_messa.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.melisa_messa.task_manager.model.Task;
import com.melisa_messa.task_manager.repository.TaskRepository;
import com.melisa_messa.task_manager.model.User;
import com.melisa_messa.task_manager.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository; // Añadido el repositorio UserRepository

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository; // Inyectado el UserRepository
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

    public List<Task> getTaskByCategory(Long categoryId){
        return taskRepository.findByCategoryId(categoryId);
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
        existingTask.setCategory(updatedTask.getCategory());
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
}

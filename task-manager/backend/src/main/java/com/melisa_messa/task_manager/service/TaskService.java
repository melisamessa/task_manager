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
        // Buscar el usuario por el email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Asociar el usuario con la tarea
        task.setUser(user);
        
        // Guardar la tarea en la base de datos
        return taskRepository.save(task);
    }

    public List<Task> getTaskByCategory(Long categoryId){
        return taskRepository.findByCategoryId(categoryId);
    }

    // Modificado para aceptar el userId como parámetro en vez de usar @PathVariable
    public List<Task> getTaskByUser(Long userId){
        System.out.println("User ID en el servicio: " + userId);
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }
}

package com.melisa_messa.task_manager.controller;

import com.melisa_messa.task_manager.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.melisa_messa.task_manager.model.Task;


@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping("/create")
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @GetMapping("/category/{category_id}")
    public List<Task> getTaskByCategory(Long categoryId){
        return taskService.getTaskByCategory(categoryId);
    }

    @GetMapping("/{id}")
    public Optional<Task> getTaskById(Long id){
        return taskService.getTaskById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(Long id){
        taskService.deleteTask(id);
    }

}

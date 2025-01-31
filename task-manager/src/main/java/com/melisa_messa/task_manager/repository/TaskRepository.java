package com.melisa_messa.task_manager.repository;

import com.melisa_messa.task_manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByCategoryId(long categoryId);
}

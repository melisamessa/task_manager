package com.melisa_messa.task_manager.repository;

import com.melisa_messa.task_manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.repository.query.Param;




public interface TaskRepository extends JpaRepository<Task, Long>{

    List<Task> findByUserId(@Param("userId") Long userId);
    List<Task> findByProjectId(@Param("projectId") Long projectId);
}

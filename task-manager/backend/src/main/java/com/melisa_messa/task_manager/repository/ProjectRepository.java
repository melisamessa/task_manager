package com.melisa_messa.task_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import com.melisa_messa.task_manager.model.Project;
import java.util.*;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUserId(@Param("userId") Long userId);
}


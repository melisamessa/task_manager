package com.melisa_messa.task_manager.repository;

import com.melisa_messa.task_manager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository <Category,Long>{
    
}

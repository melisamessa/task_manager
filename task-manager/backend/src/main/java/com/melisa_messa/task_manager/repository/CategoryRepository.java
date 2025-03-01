package com.melisa_messa.task_manager.repository;

import com.melisa_messa.task_manager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface CategoryRepository extends JpaRepository <Category,Long>{
    List<Category> findByUserId(@Param("userId") Long userId);
}

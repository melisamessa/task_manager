package com.melisa_messa.task_manager.repository;

import com.melisa_messa.task_manager.model.User;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository <User, Long>{

    Optional<User> findByEmail(String email);
    
}

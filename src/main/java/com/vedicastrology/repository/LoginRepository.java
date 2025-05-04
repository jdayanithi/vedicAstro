package com.vedicastrology.repository;

import com.vedicastrology.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {
    boolean existsByUsername(String username);
    Login findByUsername(String username);
}
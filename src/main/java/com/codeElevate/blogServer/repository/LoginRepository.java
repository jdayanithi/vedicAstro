package com.codeElevate.blogServer.repository;

import com.codeElevate.blogServer.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {
    boolean existsByUsername(String username);
    Login findByUsername(String username);
}
package com.vedicastrology.repository;

import com.vedicastrology.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LoginRepository extends JpaRepository<Login, Long> {
    boolean existsByUsername(String username);
    Login findByUsername(String username);
    
    @Query("SELECT l FROM Login l WHERE LOWER(l.firstName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(l.lastName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(l.username) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Login> searchUsers(@Param("query") String query);
}
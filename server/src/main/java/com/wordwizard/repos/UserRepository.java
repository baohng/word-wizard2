package com.wordwizard.repos;

import com.wordwizard.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    @Query("SELECT to_char(u.createdAt, 'YYYY-MM') as yearMonth, COUNT(u) as count " +
            "FROM User u " +
            "WHERE u.createdAt >= :startDate AND u.createdAt < :endDate " +
            "GROUP BY to_char(u.createdAt, 'YYYY-MM') " +
            "ORDER BY to_char(u.createdAt, 'YYYY-MM')")
    List<Object[]> countRegistrationsByMonth(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);


}

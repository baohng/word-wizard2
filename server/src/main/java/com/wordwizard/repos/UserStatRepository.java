package com.wordwizard.repos;

import com.wordwizard.models.UserStat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStatRepository extends JpaRepository<UserStat, Long> {
}

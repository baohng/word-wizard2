package com.wordwizard.repos;

import com.wordwizard.models.UserWord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserWordRepository extends JpaRepository<UserWord, Long> {
}

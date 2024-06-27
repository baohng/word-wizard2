package com.wordwizard.services;

import com.wordwizard.models.Streak;
import com.wordwizard.repos.StreakRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreakService {

    private final StreakRepository streakRepository;

    @Autowired
    public StreakService(StreakRepository streakRepository) {
        this.streakRepository = streakRepository;
    }

    public List<Streak> getAllStreaks() {
        return streakRepository.findAll();
    }

    public Streak getStreakById(Long id) {
        return streakRepository.findById(id).orElse(null);
    }

    public Streak saveStreak(Streak streak) {
        return streakRepository.save(streak);
    }

    public void deleteStreak(Long id) {
        streakRepository.deleteById(id);
    }

    public void addStreak(Streak streak) {
        streakRepository.save(streak);
    }

    public void removeStreak(Streak streak) {
        streakRepository.delete(streak);
    }

    public void updateStreak(Streak streak) {
        streakRepository.save(streak);
    }
}

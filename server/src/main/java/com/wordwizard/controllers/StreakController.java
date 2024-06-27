package com.wordwizard.controllers;

import com.wordwizard.models.Streak;
import com.wordwizard.services.StreakService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/streaks")
@CrossOrigin(origins = "http://localhost:5173")
public class StreakController {
    private final StreakService streakService;


    @Autowired
    public StreakController(StreakService streakService) {
        this.streakService = streakService;
    }

    public void addStreak(Streak streak) {
        streakService.addStreak(streak);
    }

    public void removeStreak(Streak streak) {
        streakService.removeStreak(streak);
    }

    public void updateStreak(Streak streak) {
        streakService.updateStreak(streak);
    }

    public List<Streak> getStreaks() {
        return streakService.getAllStreaks();
    }

    public Streak getStreakById(Long id) {
        return streakService.getStreakById(id);
    }
}

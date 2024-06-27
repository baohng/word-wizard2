package com.wordwizard.controllers;

import com.wordwizard.models.Achievement;
import com.wordwizard.services.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/achievements")
public class AchievementController {
    private final AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    public void addAchievement(Achievement achievement) {
        achievementService.addAchievement(achievement);
    }

    public void removeAchievement(Achievement achievement) {
        achievementService.removeAchievement(achievement);
    }

    public void updateAchievement(Achievement achievement) {
        achievementService.updateAchievement(achievement);
    }

    public List<Achievement> getAchievements() {
        return achievementService.getAllAchievements();
    }

    public Achievement getAchievementById(Long id) {
        return achievementService.getAchievementById(id);
    }

}

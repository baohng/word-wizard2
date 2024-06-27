package com.wordwizard.controllers;

import com.wordwizard.models.UserAchievement;
import com.wordwizard.services.UserAchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user-achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class UserAchievementController {
    private final UserAchievementService userAchievementService;

    @Autowired
    public UserAchievementController(UserAchievementService userAchievementService) {
        this.userAchievementService = userAchievementService;
    }

    public void addUserAchievement(UserAchievement userAchievement) {
        userAchievementService.addUserAchievement(userAchievement);
    }

    public void removeUserAchievement(UserAchievement userAchievement) {
        userAchievementService.removeUserAchievement(userAchievement);
    }

    public void updateUserAchievement(UserAchievement userAchievement) {
        userAchievementService.updateUserAchievement(userAchievement);
    }

    public List<UserAchievement> getUserAchievements() {
        return userAchievementService.getAllUserAchievements();
    }

    public UserAchievement getUserAchievementById(Long id) {
        return userAchievementService.getUserAchievementById(id);
    }
}

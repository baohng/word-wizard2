package com.wordwizard.services;

import com.wordwizard.models.UserAchievement;
import com.wordwizard.repos.UserAchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;

    @Autowired
    public UserAchievementService(UserAchievementRepository userAchievementRepository) {
        this.userAchievementRepository = userAchievementRepository;
    }

    public List<UserAchievement> getAllUserAchievements() {
        return userAchievementRepository.findAll();
    }

    public UserAchievement getUserAchievementById(Long id) {
        return userAchievementRepository.findById(id).orElse(null);
    }

    public UserAchievement saveUserAchievement(UserAchievement userAchievement) {
        return userAchievementRepository.save(userAchievement);
    }

    public void deleteUserAchievement(Long id) {
        userAchievementRepository.deleteById(id);
    }

    public void addUserAchievement(UserAchievement userAchievement) {
        userAchievementRepository.save(userAchievement);
    }

    public void removeUserAchievement(UserAchievement userAchievement) {
        userAchievementRepository.delete(userAchievement);
    }

    public void updateUserAchievement(UserAchievement userAchievement) {
        userAchievementRepository.save(userAchievement);
    }
}

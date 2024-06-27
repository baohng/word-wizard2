package com.wordwizard.services;

import com.wordwizard.models.Achievement;
import com.wordwizard.repos.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;

    @Autowired
    // Constructor for the AchievementService class.
    // It initializes the AchievementRepository instance used by this service.
    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    // Method to fetch all achievements.
    // It returns a list of all Achievement objects stored in the database.
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    // Method to fetch a specific achievement by its ID.
    // It takes a Long id as a parameter and returns the corresponding Achievement object if it exists, or null otherwise.
    public Achievement getAchievementById(Long id) {
        return achievementRepository.findById(id).orElse(null);
    }

    // Method to save an achievement.
    // It takes an Achievement object as a parameter and saves it to the database.
    // It returns the saved Achievement object.
    public Achievement saveAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    // Method to delete a specific achievement by its ID.
    // It takes a Long id as a parameter and deletes the corresponding Achievement object from the database.
    public void deleteAchievement(Long id) {
        achievementRepository.deleteById(id);
    }

    // Method to check if a specific achievement exists by its ID.
    // It takes a Long id as a parameter and returns a boolean indicating whether the Achievement object exists in the database.
    public boolean achievementExists(Long id) {
        return achievementRepository.existsById(id);
    }

    // Method to update an achievement.
    // It takes an Achievement object as a parameter and updates the corresponding entry in the database.
    // It returns the updated Achievement object.
    public Achievement updateAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    // Method to add a new achievement.
    // It takes an Achievement object as a parameter and adds it to the database.
    // It returns the added Achievement object.
    public Achievement addAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    // Method to remove an achievement.
    // It takes an Achievement object as a parameter and removes it from the database.
    public void removeAchievement(Achievement achievement) {
        achievementRepository.delete(achievement);
    }
}

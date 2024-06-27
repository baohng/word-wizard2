package com.wordwizard.services;

import com.wordwizard.models.UserStat;
import com.wordwizard.repos.UserStatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserStatService {
    private final UserStatRepository userStatRepository;

    @Autowired
    public UserStatService(UserStatRepository userStatRepository) {
        this.userStatRepository = userStatRepository;
    }

    public List<UserStat> getAllUserStats() {
        return userStatRepository.findAll();
    }

    public UserStat getUserStatById(Long id) {
        return userStatRepository.findById(id).orElse(null);
    }

    public UserStat save(UserStat userStat) {
        return userStatRepository.save(userStat);
    }

    public void delete(UserStat userStat) {
        userStatRepository.delete(userStat);
    }

    public UserStat getUserStat() {
        return userStatRepository.findAll().get(0);
    }

    public UserStat updateUserStat(UserStat userStat) {
        return userStatRepository.save(userStat);
    }

    public UserStat deleteUserStat() {
        UserStat userStat = userStatRepository.findAll().get(0);
        userStatRepository.delete(userStat);
        return userStat;
    }

    public UserStat createUserStat(UserStat userStat) {
        return userStatRepository.save(userStat);
    }
}

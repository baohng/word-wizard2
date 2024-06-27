package com.wordwizard.controllers;

import com.wordwizard.models.UserStat;
import com.wordwizard.services.UserStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userstat")
@CrossOrigin(origins = "http://localhost:5173")
public class UserStatController {
    private final UserStatService userStatService;

    @Autowired
    public UserStatController(UserStatService userStatService) {
        this.userStatService = userStatService;
    }

    public UserStat getUserStat() {
        return userStatService.getUserStat();
    }

    public UserStat updateUserStat(UserStat userStat) {
        return userStatService.updateUserStat(userStat);
    }

    public UserStat deleteUserStat() {
        return userStatService.deleteUserStat();
    }

    public UserStat createUserStat(UserStat userStat) {
        return userStatService.createUserStat(userStat);
    }

}

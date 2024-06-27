package com.wordwizard.controllers;

import com.wordwizard.models.UserWord;
import com.wordwizard.services.UserWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/word")
@CrossOrigin(origins = "http://localhost:5173")
public class UserWordController {
    private final UserWordService userWordService;

    @Autowired
    public UserWordController(UserWordService userWordService) {
        this.userWordService = userWordService;
    }

    public UserWord getUserWord() {
        return userWordService.getUserWord();
    }

    public UserWord updateUserWord(UserWord userWord) {
        return userWordService.updateUserWord(userWord);
    }

    public UserWord deleteUserWord() {
        return userWordService.deleteUserWord();
    }

    public UserWord createUserWord(UserWord userWord) {
        return userWordService.createUserWord(userWord);
    }
}

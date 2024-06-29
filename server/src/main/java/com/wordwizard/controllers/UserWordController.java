package com.wordwizard.controllers;

import com.wordwizard.models.UserWord;
import com.wordwizard.services.UserWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/word")
@CrossOrigin(origins = "http://localhost:5173")
public class UserWordController {
    private final UserWordService userWordService;

    @Autowired
    public UserWordController(UserWordService userWordService) {
        this.userWordService = userWordService;
    }

    @PostMapping("/add-words")
    public ResponseEntity<UserWord> createUserWord(@RequestBody UserWord userWord) {
        try {
            UserWord savedUserWord = userWordService.createUserWord(userWord);
            return new ResponseEntity<>(savedUserWord, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

}

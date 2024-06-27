package com.wordwizard.controllers;

import com.wordwizard.services.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/words")
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {
    private final WordService wordService;

    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    // Add your methods here
    public void addWord() {
        // Add your code here
    }

    public void getWord() {
        // Add your code here
    }

    public void getWords() {
        // Add your code here
    }

    public void updateWord() {
        // Add your code here
    }

    public void deleteWord() {
        // Add your code here
    }

    public void getWordsByCategory() {
        // Add your code here
    }

    public void getWordsByDifficulty() {
        // Add your code here
    }
}

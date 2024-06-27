package com.wordwizard.controllers;

import com.wordwizard.models.Word;
import com.wordwizard.repos.WordRepository;
import com.wordwizard.services.WordService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/words")
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {
    private final WordService wordService;
    private final WordRepository wordRepository;

    @Autowired
    public WordController(WordService wordService, WordRepository wordRepository) {
        this.wordService = wordService;
        this.wordRepository = wordRepository;
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Word> updateWord(@PathVariable Long id, @RequestBody Word wordRequest) {
        Word updatedWord = wordService.updateWord(id, wordRequest);
        return new ResponseEntity<>(updatedWord, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteWord(@PathVariable Long id) {
        try {
            wordService.deleteWordById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

package com.wordwizard.services;

import com.wordwizard.models.Word;
import com.wordwizard.repos.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {
    private final WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    public Word getWordById(Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    public Word save(Word word) {
        return wordRepository.save(word);
    }

    public void delete(Word word) {
        wordRepository.delete(word);
    }
}

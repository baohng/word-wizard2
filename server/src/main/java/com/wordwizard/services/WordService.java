package com.wordwizard.services;

import com.wordwizard.models.Word;
import com.wordwizard.repos.WordRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public Word updateWord(Long id, Word wordRequest) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Word not found for this id :: " + id));

        word.setWord(wordRequest.getWord());
        word.setMeaning(wordRequest.getMeaning());
        word.setPhonetic(wordRequest.getPhonetic());
        word.setExampleSentences(wordRequest.getExampleSentences());
        // Set other fields as necessary

        return wordRepository.save(word);
    }

    public void deleteWordById(Long id) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Word not found for this id :: " + id));
        wordRepository.delete(word);
    }
}

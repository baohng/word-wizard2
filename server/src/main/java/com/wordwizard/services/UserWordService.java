package com.wordwizard.services;

import com.wordwizard.models.UserWord;
import com.wordwizard.repos.UserWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import java.util.List;

@Service
public class UserWordService {
    private final UserWordRepository userWordRepository;

    @Autowired
    public UserWordService(UserWordRepository userWordRepository) {
        this.userWordRepository = userWordRepository;
    }

    public UserWord createUserWord(UserWord userWord) {
        return userWordRepository.save(userWord);
    }









    public List<UserWord> getAllUserWords() {
        return userWordRepository.findAll();
    }

    public UserWord getUserWordById(Long id) {
        return userWordRepository.findById(id).orElse(null);
    }

    public UserWord save(UserWord userWord) {
        return userWordRepository.save(userWord);
    }

    public void delete(UserWord userWord) {
        userWordRepository.delete(userWord);
    }

    public UserWord getUserWord() {
        return null;
    }

    public UserWord updateUserWord(UserWord userWord) {
        return null;
    }

    public UserWord deleteUserWord() {
        return null;
    }

}

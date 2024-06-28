package com.wordwizard.controllers;

import com.wordwizard.models.User;
import com.wordwizard.models.Word;
import com.wordwizard.repos.UserRepository;
import com.wordwizard.repos.WordRepository;
import com.wordwizard.services.TopicService;
import com.wordwizard.services.UserService;
import com.wordwizard.services.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-manager")
@CrossOrigin(origins = "http://localhost:3030")
public class UserManagerController {

    private final UserService userService;
    private final TopicService topicService;
    private final WordService wordService;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    public UserManagerController(UserService userService, TopicService topicService, WordService wordService) {
        this.userService = userService;
        this.topicService = topicService;
        this.wordService = wordService;
    }

        @GetMapping("/users")
        public ResponseEntity<List<User>> getAllUsers() {
            List<User> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    @PostMapping("/add-user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PutMapping("/update-user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }
    @GetMapping("/registrations-by-month")
    public ResponseEntity<Map<String, Long>> getRegistrationsByMonth(
            @RequestParam(value = "startDate", required = false) LocalDateTime startDate,
            @RequestParam(value = "endDate", required = false) LocalDateTime endDate) {

        if (endDate == null) {
            endDate = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0); // First day of the current month
        }
        if (startDate == null) {
            startDate = endDate.minusMonths(12); // 12 months ago
        }

        Map<String, Long> registrationsByMonth = userService.getRegistrationsByMonth(startDate, endDate);
        return ResponseEntity.ok(registrationsByMonth);
    }
    @GetMapping("/topic-count")
    public ResponseEntity<Long> getTotalTopicCount() {
        long topicCount = topicService.getAccountCount( );
        return ResponseEntity.ok(topicCount);
    }
        @GetMapping("/words")
        public ResponseEntity<List<Word>> getAllWords() {
            List<Word> words = wordService.getAllWords();
            return ResponseEntity.ok(words);
        }
    }



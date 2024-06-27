package com.wordwizard.controllers;

import com.wordwizard.models.Topic;
import com.wordwizard.models.Word;
import com.wordwizard.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:5173")
public class TopicController {
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping("/{topicId}/add-word")
    public ResponseEntity<Word> addWordToTopic(@PathVariable Long topicId, @RequestBody Word word) {
        Word savedWord = topicService.addWordToTopic(topicId, word);
        return new ResponseEntity<>(savedWord, HttpStatus.CREATED);
    }


    public void addTopic(Topic topic) {
        topicService.addTopic(topic);
    }

    public void removeTopic(Topic topic) {
        topicService.removeTopic(topic);
    }

    public void updateTopic(Topic topic) {
        topicService.updateTopic(topic);
    }

    public List<Topic> getTopics() {
        return topicService.getAllTopics();
    }

    public Topic getTopicById(Long id) {
        return topicService.getTopicById(id);
    }
}

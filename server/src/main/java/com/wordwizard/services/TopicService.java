package com.wordwizard.services;

import com.wordwizard.models.Course;
import com.wordwizard.models.Topic;
import com.wordwizard.models.Word;
import com.wordwizard.repos.CourseRepository;
import com.wordwizard.repos.TopicRepository;
import com.wordwizard.repos.WordRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final CourseRepository courseRepository;
    private final WordRepository wordRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository,
                        CourseRepository courseRepository, WordRepository wordRepository) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.wordRepository = wordRepository;
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }

    public void addTopic(Topic topic) {
        topicRepository.save(topic);
    }

    public void removeTopic(Topic topic) {
        topicRepository.delete(topic);
    }

    public void updateTopic(Topic topic) {
        topicRepository.save(topic);
    }

    public Word addWordToTopic(Long topicId, Word word) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with ID: " + topicId));
        word.setTopic(topic);
        return wordRepository.save(word);
    }

    public Topic createTopicForCourse(Long courseId, Topic topic) {
        return courseRepository.findById(courseId).map(course -> {
            topic.setCourse(course);
            return topicRepository.save(topic);
        }).orElseThrow(() -> new EntityNotFoundException("Course not found with id " + courseId));
    }

    public List<Word> getWordsByTopicId(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new EntityNotFoundException("Topic not found with ID: " + topicId));
        return new ArrayList<>(topic.getWords());
    }
}

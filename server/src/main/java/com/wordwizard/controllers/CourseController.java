package com.wordwizard.controllers;

import com.wordwizard.models.Course;
import com.wordwizard.models.CourseContent;
import com.wordwizard.models.Topic;
import com.wordwizard.services.CourseContentService;
import com.wordwizard.services.CourseService;
import com.wordwizard.services.TopicService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService courseService;
    private final TopicService topicService;

    @Autowired
    public CourseController(CourseService courseService, TopicService topicService) {
        this.courseService = courseService;
        this.topicService = topicService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId) {
        Course course = courseService.getCourseById(courseId);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course courseRequest) {
        Course createdCourse = courseService.createCourse(courseRequest.getName(),
                courseRequest.getDescription()
        );
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    @GetMapping("/{courseId}/topics")
    public ResponseEntity<List<Topic>> getTopicsByCourseId(@PathVariable Long courseId) {
        List<Topic> topics = courseService.getTopicsByCourseId(courseId);
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

//    @PostMapping("/{courseId}/create-topic")
//    public ResponseEntity<Topic> addTopic(@PathVariable Long courseId, @RequestBody Topic topic) {
//        Topic savedTopic = topicService.addTopic(topic, courseId);
//        return new ResponseEntity<>(savedTopic, HttpStatus.CREATED);
//    }
}

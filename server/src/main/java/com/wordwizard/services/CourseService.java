package com.wordwizard.services;

import com.wordwizard.models.Course;
import com.wordwizard.models.CourseContent;
import com.wordwizard.models.Topic;
import com.wordwizard.repos.CourseRepository;
import com.wordwizard.repos.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final TopicRepository topicRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository,
                         TopicRepository topicRepository) {
        this.courseRepository = courseRepository;
        this.topicRepository = topicRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public List<Topic> getTopicsByCourseId(Long courseId) {
        return topicRepository.findByCourse_Id(courseId);
    }



    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public void addCourse(Course course) {
        courseRepository.save(course);
    }

    public void removeCourse(Course course) {
        courseRepository.delete(course);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }

    public Course createCourse(String name, String description) {
        Course course = new Course();
        course.setName(name);
        course.setDescription(description);
        return courseRepository.save(course);
    }
}

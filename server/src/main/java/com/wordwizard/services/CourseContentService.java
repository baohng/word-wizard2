package com.wordwizard.services;

import com.wordwizard.models.Course;
import com.wordwizard.models.CourseContent;
import com.wordwizard.models.Topic;
import com.wordwizard.repos.CourseContentRepository;
import com.wordwizard.repos.CourseRepository;
import com.wordwizard.repos.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseContentService {

    private final CourseContentRepository courseContentRepository;

    @Autowired
    public CourseContentService(CourseContentRepository courseContentRepository) {
        this.courseContentRepository = courseContentRepository;
    }

    public void deleteCourseContent(Long id) {
        courseContentRepository.deleteById(id);
    }

    public boolean courseContentExists(Long id) {
        return courseContentRepository.existsById(id);
    }

    public List<CourseContent> getAllCourseContents() {
        return courseContentRepository.findAll();
    }

    public CourseContent getCourseContentById(Long id) {
        return courseContentRepository.findById(id).orElse(null);
    }

    public CourseContent saveCourseContent(CourseContent courseContent) {
        return courseContentRepository.save(courseContent);
    }


    public void addCourseContent(CourseContent courseContent) {
        courseContentRepository.save(courseContent);
    }

    public void removeCourseContent(CourseContent courseContent) {
        courseContentRepository.delete(courseContent);
    }

    public void updateCourseContent(CourseContent courseContent) {
        courseContentRepository.save(courseContent);
    }

    public CourseContent save(CourseContent courseContent) {
        return courseContentRepository.save(courseContent);
    }
}

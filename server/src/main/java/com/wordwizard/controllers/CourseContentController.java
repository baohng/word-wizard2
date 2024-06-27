package com.wordwizard.controllers;

import com.wordwizard.models.CourseContent;
import com.wordwizard.services.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course-content")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseContentController {
    private final CourseContentService courseContentService;

    @Autowired
    public CourseContentController(CourseContentService courseContentService) {
        this.courseContentService = courseContentService;
    }

    public void addCourseContent(CourseContent courseContent) {
        courseContentService.addCourseContent(courseContent);
    }

    public void removeCourseContent(CourseContent courseContent) {
        courseContentService.removeCourseContent(courseContent);
    }

    public void updateCourseContent(CourseContent courseContent) {
        courseContentService.updateCourseContent(courseContent);
    }

    public List<CourseContent> getCourseContents() {
        return courseContentService.getAllCourseContents();
    }

    public CourseContent getCourseContentById(Long id) {
        return courseContentService.getCourseContentById(id);
    }
}

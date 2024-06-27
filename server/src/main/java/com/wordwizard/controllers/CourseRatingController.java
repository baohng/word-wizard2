package com.wordwizard.controllers;

import com.wordwizard.models.CourseRating;
import com.wordwizard.services.CourseRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/course-ratings")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseRatingController {
    private final CourseRatingService courseRatingService;

    @Autowired
    public CourseRatingController(CourseRatingService courseRatingService) {
        this.courseRatingService = courseRatingService;
    }

    public void addCourseRating(CourseRating courseRating) {
        courseRatingService.addCourseRating(courseRating);
    }

    public void removeCourseRating(CourseRating courseRating) {
        courseRatingService.removeCourseRating(courseRating);
    }

    public void updateCourseRating(CourseRating courseRating) {
        courseRatingService.updateCourseRating(courseRating);
    }

    public List<CourseRating> getCourseRatings() {
        return courseRatingService.getAllCourseRatings();
    }

    public CourseRating getCourseRatingById(Long id) {
        return courseRatingService.getCourseRatingById(id);
    }
}

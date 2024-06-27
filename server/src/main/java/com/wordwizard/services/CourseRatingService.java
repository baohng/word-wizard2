package com.wordwizard.services;

import com.wordwizard.models.CourseRating;
import com.wordwizard.repos.CourseRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseRatingService {

    private final CourseRatingRepository courseRatingRepository;

    @Autowired
    public CourseRatingService(CourseRatingRepository courseRatingRepository) {
        this.courseRatingRepository = courseRatingRepository;
    }

    public void deleteCourseRating(Long id) {
        courseRatingRepository.deleteById(id);
    }

    public boolean courseRatingExists(Long id) {
        return courseRatingRepository.existsById(id);
    }

    public List<CourseRating> getAllCourseRatings() {
        return courseRatingRepository.findAll();
    }

    public CourseRating getCourseRatingById(Long id) {
        return courseRatingRepository.findById(id).orElse(null);
    }

    public CourseRating saveCourseRating(CourseRating courseRating) {
        return courseRatingRepository.save(courseRating);
    }


    public void addCourseRating(CourseRating courseRating) {
        courseRatingRepository.save(courseRating);
    }

    public void removeCourseRating(CourseRating courseRating) {
        courseRatingRepository.delete(courseRating);
    }

    public void updateCourseRating(CourseRating courseRating) {
        courseRatingRepository.save(courseRating);
    }
}

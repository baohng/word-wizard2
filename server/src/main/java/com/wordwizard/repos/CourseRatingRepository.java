package com.wordwizard.repos;

import com.wordwizard.models.CourseRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {
}

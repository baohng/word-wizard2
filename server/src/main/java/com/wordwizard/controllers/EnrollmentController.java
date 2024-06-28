package com.wordwizard.controllers;

import com.wordwizard.models.Course;
import com.wordwizard.models.Enrollment;
import com.wordwizard.models.User;
import com.wordwizard.repos.CourseRepository;
import com.wordwizard.repos.UserRepository;
import com.wordwizard.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;
    private static final Logger logger = LoggerFactory.getLogger(EnrollmentController.class);
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService, CourseRepository courseRepository, UserRepository userRepository) {
        this.enrollmentService = enrollmentService;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> enrollmentRequest) {
        try {
            Long userId = enrollmentRequest.get("userId");
            Long courseId = enrollmentRequest.get("courseId");

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new Exception("User not found"));
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new Exception("Course not found"));

            Enrollment newEnrollment = new Enrollment();
            newEnrollment.setUser(user);
            newEnrollment.setCourse(course);

            Enrollment savedEnrollment = enrollmentService.addEnrollment(newEnrollment);
            return ResponseEntity.ok(savedEnrollment);
        } catch (DataIntegrityViolationException e) {
            logger.error("Data integrity violation when trying to enroll: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Enrollment data violates constraints.");
        } catch (Exception e) {
            logger.error("Failed to enroll in course: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to enroll in course due to an unexpected error.");
        }
    }


    public void addEnrollment(Enrollment enrollment) {
        enrollmentService.addEnrollment(enrollment);
    }

    public void removeEnrollment(Enrollment enrollment) {
        enrollmentService.removeEnrollment(enrollment);
    }

    public void updateEnrollment(Enrollment enrollment) {
        enrollmentService.updateEnrollment(enrollment);
    }

    public List<Enrollment> getEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    public Enrollment getEnrollmentById(Long id) {
        return enrollmentService.getEnrollmentById(id);
    }
}

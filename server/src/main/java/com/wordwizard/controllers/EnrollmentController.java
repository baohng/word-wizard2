package com.wordwizard.controllers;

import com.wordwizard.models.Enrollment;
import com.wordwizard.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
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

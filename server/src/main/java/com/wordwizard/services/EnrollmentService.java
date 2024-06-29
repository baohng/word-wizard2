package com.wordwizard.services;

import com.wordwizard.models.Enrollment;
import com.wordwizard.repos.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id).orElse(null);
    }

    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }

    public Enrollment addEnrollment(Enrollment enrollment) {
        enrollmentRepository.save(enrollment);
        return enrollment;
    }

    public void removeEnrollment(Enrollment enrollment) {
        enrollmentRepository.delete(enrollment);
    }

    public void updateEnrollment(Enrollment enrollment) {
        enrollmentRepository.save(enrollment);
    }
}

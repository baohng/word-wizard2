package com.wordwizard.services;

import com.wordwizard.models.UserReport;
import com.wordwizard.repos.UserReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserReportService {

    private final UserReportRepository userReportRepository;

    @Autowired
    public UserReportService(UserReportRepository userReportRepository) {
        this.userReportRepository = userReportRepository;
    }

    public List<UserReport> getAllUserReports() {
        return userReportRepository.findAll();
    }

    public UserReport getUserReportById(Long id) {
        return userReportRepository.findById(id).orElse(null);
    }

    public UserReport saveUserReport(UserReport userReport) {
        return userReportRepository.save(userReport);
    }

    public void deleteUserReport(Long id) {
        userReportRepository.deleteById(id);
    }

    public void createReport(UserReport userReport) {
        userReportRepository.save(userReport);
    }

    public void updateReport(UserReport userReport) {
        userReportRepository.save(userReport);
    }

    public void deleteReport(UserReport userReport) {
        userReportRepository.delete(userReport);
    }

    public UserReport getReportById(Long id) {
        return userReportRepository.findById(id).orElse(null);
    }

    public List<UserReport> getAllReports() {
        return userReportRepository.findAll();
    }
}

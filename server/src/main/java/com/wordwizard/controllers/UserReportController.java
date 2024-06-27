package com.wordwizard.controllers;

import com.wordwizard.models.UserReport;
import com.wordwizard.services.UserReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/report")
@CrossOrigin(origins = "http://localhost:5173")
public class UserReportController {
    private final UserReportService userReportService;

    @Autowired
    public UserReportController(UserReportService userReportService) {
        this.userReportService = userReportService;
    }

    public void createReport(UserReport userReport) {
        userReportService.createReport(userReport);
    }

    public void updateReport(UserReport userReport) {
        userReportService.updateReport(userReport);
    }

    public void deleteReport(UserReport userReport) {
        userReportService.deleteReport(userReport);
    }

    public UserReport getReportById(Long id) {
        return userReportService.getReportById(id);
    }

    public List<UserReport> getAllReports() {
        return userReportService.getAllReports();
    }
}

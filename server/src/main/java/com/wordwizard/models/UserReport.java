package com.wordwizard.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "user_reports")
@Getter
@Setter
public class UserReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date reportDate;

    private Integer totalUsers;

    private Integer newUsers;

    private Integer activeUsers;

    private String otherData;
}

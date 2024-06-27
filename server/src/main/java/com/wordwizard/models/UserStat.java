package com.wordwizard.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "user_stats")
@Getter
@Setter
public class UserStat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column
    private Integer totalWordsLearned;

    @Column
    private Integer totalStreakDays;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLearnedAt;
}

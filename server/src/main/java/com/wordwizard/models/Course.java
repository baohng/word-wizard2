package com.wordwizard.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "courses")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column()
    private String imageUrl;
    @Column()
    private Double averageRating;
    @Column()
    private Integer numRatings;
    @Column()
    private Integer numEnrolled;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference("course-enrollment")
    private List<Enrollment> enrollments = new ArrayList<>();

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CourseContent> courseContents = new ArrayList<>();

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CourseRating> courseRatings = new ArrayList<>();

    @OneToMany(
            mappedBy = "course"
    )
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(
            mappedBy = "course"
    )
    @JsonManagedReference("course-topic")
    private List<Topic> topics = new ArrayList<>();
}

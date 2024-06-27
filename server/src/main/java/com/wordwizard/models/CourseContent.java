package com.wordwizard.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "course_content")
@Getter
@Setter
public class CourseContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column()
    private String name;

    @Column()
    private String contentType;

    @Column()
    private String description;

    @ManyToOne(optional = true)
    @JoinColumn(name = "topic_id")
    private Topic topic;
}

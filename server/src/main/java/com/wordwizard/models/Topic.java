package com.wordwizard.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "topic")
    private List<CourseContent> courseContent = new ArrayList<>();

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String meaningInVietnamese;

    @OneToMany(mappedBy = "topic")
    private List<Word> words = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonBackReference
    private Course course;

}

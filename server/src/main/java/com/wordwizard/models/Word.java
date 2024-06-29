package com.wordwizard.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "words")
@Getter
@Setter
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String meaning;

    private String pronunciation;

    private String phonetic;

    private String pathOfSpeech;

    private String exampleSentences;

    @OneToMany(mappedBy = "word")
    private List<UserWord> userWords;

}

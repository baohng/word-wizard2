package com.wordwizard.controllers;

import com.wordwizard.models.Comment;
import com.wordwizard.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    public void addComment(Comment comment) {
        commentService.addComment(comment);
    }

    public void removeComment(Comment comment) {
        commentService.removeComment(comment);
    }

    public void updateComment(Comment comment) {
        commentService.updateComment(comment);
    }

    public List<Comment> getComments() {
        return commentService.getAllComments();
    }
}

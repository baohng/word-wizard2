package com.wordwizard.services;

import com.wordwizard.models.Comment;
import com.wordwizard.repos.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public boolean commentExists(Long id) {
        return commentRepository.existsById(id);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    public void removeComment(Comment comment) {
        commentRepository.delete(comment);
    }

    public void updateComment(Comment comment) {
        commentRepository.save(comment);
    }
}

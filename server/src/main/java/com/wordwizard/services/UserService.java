package com.wordwizard.services;

import com.wordwizard.models.User;
import com.wordwizard.models.UserRole;
import com.wordwizard.repos.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Implement the signUp method
    public User signUp(User user) {
        UserRole defaultRole = UserRole.STUDENT;
        // Password is set without encoding
        user.setIsActive(true);
        user.setRoles(Collections.singleton(defaultRole));
        return userRepository.save(user);
    }

    // Implement the signIn method
    public User signIn(String email, String password) {
        logger.info("Signing in user with email: {}", email);
        User user = userRepository.findByEmail(email);
        if (user != null) {
            logger.info("User found with email: {}", email);
            // Directly compare the password without encoding
            if (password.equals(user.getPassword())) {
                logger.info("Password matches for user with email: {}", email);
                if (userHasRole(user, UserRole.ADMIN)) {
                    return user;
                }
                logger.info("User role is: {}", user.getRoles());
                return user;
            }
        }
        logger.info("signIn method exited with email: {}", email);
        return null;
    }

    public boolean userHasRole(User user, UserRole role) {
        return user.getRoles().contains(role);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
package com.wordwizard.controllers;

import com.wordwizard.models.User;
import com.wordwizard.models.UserRole;
import com.wordwizard.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        // Create user
        User newUser = userService.signUp(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);

    }

    @PostMapping("/sign-in")
    public ResponseEntity<Map<String, Object>> signIn(@RequestBody User user) {
        User signedInUser = userService.signIn(user.getEmail(), user.getPassword());
        if (signedInUser != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", signedInUser.getUserId()); // Assuming there's a getId() method.
            response.put("roles", signedInUser.getRoles()); // Assuming roles are important for your client.
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    public void adminOnlyEndpoint() {
    }



    public void updateUser() {
        // Update user
    }

    public void deleteUser() {
        // Delete user
    }

    public void getUser() {
        // Get user
    }

    public void getUsers() {
        // Get users
    }


}

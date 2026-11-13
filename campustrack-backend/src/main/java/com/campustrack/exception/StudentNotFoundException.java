package com.campustrack.exception;

/**
 * Custom runtime exception thrown when a student with a specific ID is not found.
 */
public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException(String message) {
        super(message);
    }

    public StudentNotFoundException(Long id) {
        super("Student not found with ID: " + id);
    }
}

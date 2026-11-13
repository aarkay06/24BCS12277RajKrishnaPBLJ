package com.campustrack.repository;

import com.campustrack.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Student entity providing CRUD and custom query operations.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Find all students by course name (case-insensitive for better usability).
     *
     * @param course Course name
     * @return List of matching students
     */
    List<Student> findByCourseIgnoreCase(String course);
}

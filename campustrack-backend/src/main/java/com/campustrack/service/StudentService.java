package com.campustrack.service;

import com.campustrack.entity.Student;
import java.util.List;

/**
 * Service interface defining business logic operations for Students.
 */
public interface StudentService {

    Student addStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student studentDetails);

    void deleteStudent(Long id);

    List<Student> getStudentsByCourse(String course);
}

package com.campustrack.service;

import com.campustrack.entity.Student;
import com.campustrack.exception.StudentNotFoundException;
import com.campustrack.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service implementation for Student business logic.
 */
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student addStudent(Student student) {
        // Validate required fields
        if (student.getName() == null || student.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Student name cannot be empty.");
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Student email cannot be empty.");
        }
        if (student.getCourse() == null || student.getCourse().trim().isEmpty()) {
            throw new IllegalArgumentException("Student course cannot be empty.");
        }
        if (student.getAge() == null || student.getAge() <= 0) {
            throw new IllegalArgumentException("Student age must be greater than 0.");
        }

        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));

        if (studentDetails.getName() != null && !studentDetails.getName().trim().isEmpty()) {
            existingStudent.setName(studentDetails.getName());
        }
        if (studentDetails.getEmail() != null && !studentDetails.getEmail().trim().isEmpty()) {
            existingStudent.setEmail(studentDetails.getEmail());
        }
        if (studentDetails.getCourse() != null && !studentDetails.getCourse().trim().isEmpty()) {
            existingStudent.setCourse(studentDetails.getCourse());
        }
        if (studentDetails.getAge() != null && studentDetails.getAge() > 0) {
            existingStudent.setAge(studentDetails.getAge());
        }

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
        studentRepository.delete(existingStudent);
    }

    @Override
    public List<Student> getStudentsByCourse(String course) {
        return studentRepository.findByCourseIgnoreCase(course);
    }
}

/**
 * API Service for CampusTrack Student Management System
 * Handles communication with Spring Boot backend (Base: http://localhost:8080/api/students)
 */

const BASE_URL = 'http://localhost:8080/api/students';

export const studentService = {
  /**
   * 1. GET /api/students - Retrieve all students
   */
  async getAllStudents() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch students (Status ${response.status})`);
    }
    return response.json();
  },

  /**
   * 2. GET /api/students/{id} - Retrieve student by ID
   */
  async getStudentById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Student with ID ${id} not found`);
    }
    return response.json();
  },

  /**
   * 3. POST /api/students - Add a new student
   */
  async addStudent(studentData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to add student');
    }
    return response.json();
  },

  /**
   * 4. PUT /api/students/{id} - Update existing student
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update student ID ${id}`);
    }
    return response.json();
  },

  /**
   * 5. DELETE /api/students/{id} - Delete student
   */
  async deleteStudent(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete student ID ${id}`);
    }
    return true;
  },

  /**
   * 6. GET /api/students/course/{course} - Retrieve students by course
   */
  async getStudentsByCourse(course) {
    const encodedCourse = encodeURIComponent(course);
    const response = await fetch(`${BASE_URL}/course/${encodedCourse}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to filter by course ${course}`);
    }
    return response.json();
  },
};

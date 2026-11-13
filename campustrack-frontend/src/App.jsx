import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Plus, Filter, RotateCw, AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import { studentService } from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [allStudentsCache, setAllStudentsCache] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all students (Endpoint 2: GET /api/students)
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
      setAllStudentsCache(data);
      setBackendConnected(true);
    } catch (err) {
      setError(err.message || 'Unable to connect to Spring Boot backend.');
      setBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter students by Course via Backend (Endpoint 6: GET /api/students/course/{course})
  const handleCourseFilterChange = async (course) => {
    setSelectedCourse(course);
    setIsLoading(true);
    setError(null);

    try {
      if (!course) {
        // If "All Courses", fetch all students
        const data = await studentService.getAllStudents();
        setStudents(data);
      } else {
        // Direct call to Backend Endpoint: GET /api/students/course/{course}
        const data = await studentService.getStudentsByCourse(course);
        setStudents(data);
      }
    } catch (err) {
      setError(err.message || `Failed to filter students by course ${course}`);
      addToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Extract unique courses for dropdown
  const availableCourses = useMemo(() => {
    const set = new Set();
    allStudentsCache.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim());
      }
    });
    return Array.from(set).sort();
  }, [allStudentsCache]);

  // Client-side search across Name and Email
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;
    const term = searchTerm.toLowerCase();
    return students.filter(
      (s) =>
        (s.name && s.name.toLowerCase().includes(term)) ||
        (s.email && s.email.toLowerCase().includes(term))
    );
  }, [students, searchTerm]);

  // Handle Add or Edit Student (Endpoint 1: POST, Endpoint 4: PUT)
  const handleSaveStudent = async (studentData) => {
    setIsSubmitting(true);
    try {
      if (studentToEdit) {
        // Endpoint 4: PUT /api/students/{id}
        const updated = await studentService.updateStudent(studentToEdit.id, studentData);
        addToast(`Student "${updated.name}" updated successfully.`);
      } else {
        // Endpoint 1: POST /api/students
        const created = await studentService.addStudent(studentData);
        addToast(`Student "${created.name}" enrolled successfully.`);
      }

      setIsModalOpen(false);
      setStudentToEdit(null);

      // Refresh list to maintain consistency
      if (selectedCourse) {
        await handleCourseFilterChange(selectedCourse);
      } else {
        await fetchStudents();
      }
    } catch (err) {
      addToast(err.message || 'Operation failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Student (Endpoint 5: DELETE /api/students/{id})
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await studentService.deleteStudent(studentToDelete.id);
      addToast(`Student "${studentToDelete.name}" deleted successfully.`);
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);

      // Refresh list
      if (selectedCourse) {
        await handleCourseFilterChange(selectedCourse);
      } else {
        await fetchStudents();
      }
    } catch (err) {
      addToast(err.message || 'Failed to delete student.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const openAddModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar backendConnected={backendConnected} />

      <main className="main-content">
        {/* Global Connection / General Error Banner */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--danger-50)',
              border: '1px solid var(--danger-100)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              color: 'var(--danger-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle size={22} />
              <div>
                <strong>Backend Connection Notice:</strong> {error}
                <div style={{ fontSize: '0.825rem', color: 'var(--navy-600)', marginTop: '2px' }}>
                  Make sure Spring Boot backend is running on <code>http://localhost:8080</code> and MySQL is active.
                </div>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={fetchStudents}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
            >
              <RotateCw size={14} /> Retry
            </button>
          </div>
        )}

        {/* Top Summary Metrics */}
        <StatsCards students={allStudentsCache} availableCourses={availableCourses} />

        {/* Action & Filter Toolbar */}
        <div className="toolbar-card">
          <div className="toolbar-filters">
            {/* Search Input */}
            <div className="search-box">
              <Search size={18} className="search-box-icon" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Course Filter Dropdown - Connected to Backend Endpoint #6 */}
            <select
              className="select-filter"
              value={selectedCourse}
              onChange={(e) => handleCourseFilterChange(e.target.value)}
            >
              <option value="">All Academic Courses</option>
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {/* Refresh Button */}
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCourse('');
                setSearchTerm('');
                fetchStudents();
              }}
              title="Refresh student records from database"
            >
              <RotateCw size={16} /> Reset Filters
            </button>
          </div>

          {/* Add Student Primary Action */}
          <button className="btn btn-primary" onClick={openAddModal}>
            <Plus size={18} /> Add Student
          </button>
        </div>

        {/* Student Records Table */}
        <StudentTable
          students={filteredStudents}
          isLoading={isLoading}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          onAddNew={openAddModal}
          searchTerm={searchTerm}
          selectedCourse={selectedCourse}
        />
      </main>

      {/* Add / Edit Student Modal Form */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
        isDeleting={isDeleting}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      <footer className="campus-footer">
        <p>
          Campus<span>Track</span> Student Management System &bull; Java 17 + Spring Boot 3 &bull; React.js + Vite &bull; MySQL
        </p>
      </footer>
    </div>
  );
}

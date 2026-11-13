import React, { useState, useEffect } from 'react';
import { X, UserPlus, Edit3 } from 'lucide-react';

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    age: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        course: studentToEdit.course || '',
        age: studentToEdit.age !== undefined ? String(studentToEdit.age) : '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        course: '',
        age: '',
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!formData.course.trim()) errs.course = 'Course name is required.';

    if (!formData.age) {
      errs.age = 'Age is required.';
    } else if (isNaN(formData.age) || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      errs.age = 'Age must be a valid positive number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      age: parseInt(formData.age, 10),
    });
  };

  const commonCourses = [
    'Computer Science',
    'Information Technology',
    'Data Science',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Business Administration',
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {studentToEdit ? <Edit3 size={20} /> : <UserPlus size={20} />}
            <h3>{studentToEdit ? 'Edit Student Details' : 'Add New Student'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="student-name">Full Name *</label>
              <input
                id="student-name"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-email">Email Address *</label>
              <input
                id="student-email"
                type="email"
                className="form-input"
                placeholder="e.g. alex.johnson@campustrack.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-course">Course / Department *</label>
              <input
                id="student-course"
                type="text"
                list="course-suggestions"
                className="form-input"
                placeholder="Select or type course name"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
              <datalist id="course-suggestions">
                {commonCourses.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.course && <p className="form-error">{errors.course}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-age">Age *</label>
              <input
                id="student-age"
                type="number"
                min="1"
                max="120"
                className="form-input"
                placeholder="e.g. 21"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              {errors.age && <p className="form-error">{errors.age}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : studentToEdit ? 'Save Changes' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

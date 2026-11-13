import React from 'react';
import { Edit2, Trash2, UserX, FolderOpen } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  onAddNew,
  searchTerm,
  selectedCourse
}) {
  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isLoading) {
    return (
      <div className="table-card">
        <div className="state-container">
          <div className="spinner"></div>
          <h4 className="state-title">Loading Students...</h4>
          <p className="state-subtitle">Communicating with CampusTrack Spring Boot API...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    const isFiltered = searchTerm || selectedCourse;
    return (
      <div className="table-card">
        <div className="state-container">
          <div className="state-icon">
            {isFiltered ? <UserX size={32} /> : <FolderOpen size={32} />}
          </div>
          <h4 className="state-title">
            {isFiltered ? 'No Matching Students Found' : 'No Student Records Yet'}
          </h4>
          <p className="state-subtitle">
            {isFiltered
              ? 'Try modifying your search query or selecting a different course filter.'
              : 'The database is currently empty. Start building your campus roster by adding a student.'}
          </p>
          {!isFiltered && (
            <button className="btn btn-primary" onClick={onAddNew}>
              Add First Student
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header-bar">
        <div className="table-header-title">
          <span>Student Directory</span>
          <span className="table-count-pill">{students.length} Records</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Course / Department</th>
              <th style={{ width: '90px' }}>Age</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <span className="id-badge">#{student.id}</span>
                </td>
                <td>
                  <div className="student-profile">
                    <div className="avatar-initials">
                      {getInitials(student.name)}
                    </div>
                    <span className="student-name-text">{student.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--navy-600)' }}>{student.email}</td>
                <td>
                  <span className="course-badge">{student.course}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--navy-700)' }}>
                    {student.age} yrs
                  </span>
                </td>
                <td>
                  <div className="actions-cell" style={{ justifyContent: 'center' }}>
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => onEdit(student)}
                      title="Edit Student Details"
                      aria-label={`Edit ${student.name}`}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => onDelete(student)}
                      title="Delete Student Record"
                      aria-label={`Delete ${student.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

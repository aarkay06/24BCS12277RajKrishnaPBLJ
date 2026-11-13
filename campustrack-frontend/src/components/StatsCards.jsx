import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';

export default function StatsCards({ students, availableCourses }) {
  const totalStudents = students.length;
  const courseCount = availableCourses.length;
  
  const averageAge = totalStudents > 0 
    ? Math.round((students.reduce((acc, curr) => acc + (Number(curr.age) || 0), 0) / totalStudents) * 10) / 10 
    : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-teal">
          <Users size={28} />
        </div>
        <div>
          <div className="stat-label">Total Enrolled Students</div>
          <div className="stat-value">{totalStudents}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-navy">
          <BookOpen size={28} />
        </div>
        <div>
          <div className="stat-label">Academic Courses Offered</div>
          <div className="stat-value">{courseCount}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-teal">
          <Clock size={28} />
        </div>
        <div>
          <div className="stat-label">Average Student Age</div>
          <div className="stat-value">{totalStudents > 0 ? `${averageAge} yrs` : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

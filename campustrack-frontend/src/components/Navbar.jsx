import React from 'react';
import { GraduationCap, Database } from 'lucide-react';

export default function Navbar({ backendConnected }) {
  return (
    <header className="campus-header">
      <div className="campus-header-content">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <GraduationCap size={26} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="brand-title">
              Campus<span>Track</span>
            </h1>
            <p className="brand-tagline">Academic Student Information & Record System</p>
          </div>
        </div>

        <div className="header-status-badge">
          <span className="status-dot"></span>
          <span>{backendConnected ? 'Backend Connected (Port 8080)' : 'Connecting to API...'}</span>
        </div>
      </div>
    </header>
  );
}

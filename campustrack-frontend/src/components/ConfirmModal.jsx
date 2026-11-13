import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, student, isDeleting }) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ background: '#b91c1c' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={20} />
            <h3>Confirm Deletion</h3>
          </div>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '1.75rem 1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--danger-50)',
            color: 'var(--danger-600)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Trash2 size={28} />
          </div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--navy-900)' }}>
            Delete Student Record?
          </h4>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.9rem', lineHeight: '1.4' }}>
            Are you sure you want to permanently delete <strong>{student.name}</strong> (ID: #{student.id})? This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Yes, Delete Student'}
          </button>
        </div>
      </div>
    </div>
  );
}

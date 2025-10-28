// Filters.jsx
import React from 'react';
import './Filters.css';

const Filters = () => {
  return (
    <div className="filters-container">
      <div className="filters-grid">
        <div className="filter-item">
          <label className="filter-label">Date</label>
          <input
            type="date"
            className="filter-input"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="filter-item">
          <label className="filter-label">Department</label>
          <select className="filter-input">
            <option value="">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="filter-label">Status</label>
          <select className="filter-input">
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
        <div className="filter-item filter-button-container">
          <button className="filter-button">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
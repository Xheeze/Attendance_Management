// Dashboard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';

const Dashboard = ({ onAddEmployee, onViewMonthly, onExportToday }) => {
  const stats = [
    { label: 'Total Employees', value: 128, color: 'stat-blue' },
    { label: 'Present Today', value: 113, color: 'stat-green' },
    { label: 'Absent Today', value: 9, color: 'stat-red' },
    { label: 'Late Arrivals', value: 6, color: 'stat-amber' },
  ];

  const recent = [
    { name: 'John Smith', action: 'Checked in', time: '09:07' },
    { name: 'Sarah Johnson', action: 'Checked out', time: '17:34' },
    { name: 'Robert Davis', action: 'Late check-in', time: '09:28' },
    { name: 'Ava Patel', action: 'Checked in', time: '08:59' },
  ];

  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      {/* Stats */}
      <div className="dash-grid">
        {stats.map((s) => (
          <div key={s.label} className={`dash-stat ${s.color}`}>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
    <div className="content-card dash-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-row">
      <button className="btn btn-primary" onClick={onAddEmployee}>Add Employee</button>
      <button className="btn btn-outline" onClick={onExportToday}>Export Today</button>
      <button className="btn btn-outline" onClick={onViewMonthly}>View Monthly Report</button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="content-card">
        <h2 className="section-title">Recent Activity</h2>
        <ul className="recent-list">
          {recent.map((r, i) => (
            <li key={i} className="recent-item">
              <span className="recent-name">{r.name}</span>
              <span className="recent-action">{r.action}</span>
              <span className="recent-time">{r.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  onAddEmployee: PropTypes.func.isRequired,
  onViewMonthly: PropTypes.func.isRequired,
  onExportToday: PropTypes.func.isRequired,
};

export default Dashboard;

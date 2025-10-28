// MonthlyReport.jsx
import React, { useState } from 'react';
import './MonthlyReport.css';

const MonthlyReport = () => {
  const [month, setMonth] = useState('2025-09');

  const summary = [
    { label: 'Working Days', value: 22 },
    { label: 'Avg Present', value: '89%' },
    { label: 'Avg Late', value: '7%' },
    { label: 'Leaves Taken', value: 34 },
  ];

  const depts = [
    { dept: 'Engineering', present: '92%', late: '5%', absent: '3%' },
    { dept: 'HR', present: '86%', late: '9%', absent: '5%' },
    { dept: 'Finance', present: '88%', late: '6%', absent: '6%' },
  ];

  return (
    <>
      <h1 className="page-title">Monthly Report</h1>
      <div className="content-card">
        <div className="mr-controls">
          <label className="mr-label">Month</label>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="mr-input" />
          <button className="btn btn-primary">Export</button>
        </div>
      </div>

      <div className="mr-grid">
        {summary.map((s) => (
          <div key={s.label} className="mr-tile">
            <div className="mr-value">{s.value}</div>
            <div className="mr-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="content-card">
        <h2 className="section-title">By Department</h2>
        <div className="table-responsive">
          <table className="mr-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Present</th>
                <th>Late</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {depts.map((d) => (
                <tr key={d.dept}>
                  <td>{d.dept}</td>
                  <td>{d.present}</td>
                  <td>{d.late}</td>
                  <td>{d.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MonthlyReport;

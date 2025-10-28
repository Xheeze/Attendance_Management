// AttendanceTable.jsx
import React from 'react';
import './AttendanceTable.css';

const AttendanceTable = ({ attendanceData = [], emptyStateMessage = "No records found" }) => {
  // If no data is provided, we'll use an empty array

  const getStatusClass = (status) => {
    if (!status) return 'status-default';
    
    switch (status.toLowerCase()) {
      case 'present':
        return 'status-present';
      case 'absent':
        return 'status-absent';
      case 'late':
        return 'status-late';
      default:
        return 'status-other';
    }
  };

  return (
    <div className="attendance-table-wrapper">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Attendance By</th>
            <th>Department</th>
            <th>Shift</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.attendanceBy || '-'}</td>
                <td>{record.department || '-'}</td>
                <td>{record.shift}</td>
                <td>{record.inTime || record.timeIn || '-'}</td>
                <td>{record.outTime || record.timeOut || '-'}</td>
                <td>
                  <span className={`attendance-table-status ${getStatusClass(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="empty-state">
                {emptyStateMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
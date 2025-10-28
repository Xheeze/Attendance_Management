// DailyAttendance.jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Filters from '../components/Filters/Filters';
import AttendanceTable from '../components/AttendanceTable/AttendanceTable';
import Pagination from '../components/Pagination/Pagination';
import './DailyAttendance.css';

const DailyAttendance = () => {
  const [department, setDepartment] = useState('');
  const [shift, setShift] = useState('');
  const [date, setDate] = useState('2025-09-16');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const rows = [
    { id: 'E-1001', name: 'EMP Contact', attendanceBy: 'Web', shift: 'Evening', inTime: '01:00', outTime: '02:00', status: 'Weekly Off', department: 'HR' },
    { id: 'E-1002', name: 'EMP Monthly', attendanceBy: 'Web', shift: 'Night', inTime: '01:00', outTime: '02:00', status: 'Absent', department: 'Finance' },
    { id: 'E-1003', name: 'John Smith', attendanceBy: 'Mobile', shift: 'Day', inTime: '09:00', outTime: '17:00', status: 'Present', department: 'Engineering' },
    { id: 'E-1004', name: 'Sarah Johnson', attendanceBy: 'Web', shift: 'Day', inTime: '09:30', outTime: '17:30', status: 'Present', department: 'Marketing' },
    { id: 'E-1005', name: 'Robert Davis', attendanceBy: 'Biometric', shift: 'Evening', inTime: '14:00', outTime: '22:00', status: 'Present', department: 'Operations' },
  ];

  const [filteredRows, setFilteredRows] = useState(rows);

  // Filter rows based on search and filter criteria
  useEffect(() => {
    let result = [...rows];
    
    // Apply department filter
    if (department) {
      result = result.filter(r => r.department === department);
    }
    
    // Apply shift filter
    if (shift) {
      result = result.filter(r => r.shift === shift);
    }
    
    // Apply search filter (case insensitive)
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.attendanceBy.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        (r.department && r.department.toLowerCase().includes(q))
      );
    }
    
    setFilteredRows(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [department, shift, debouncedSearch]);

  // Pagination calculations
  const totalRecords = filteredRows.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredRows.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <h1 className="page-title">Daily Attendance</h1>
      <div className="content-card">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, ID, status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <Filters />

        {/* Results count */}
        <div className="results-counter">
          Showing {startIndex + 1}-{Math.min(endIndex, totalRecords)} of {totalRecords} {totalRecords === 1 ? 'record' : 'records'}
          {debouncedSearch && (
            <span>
              {' '}for search: "<span className="search-term">{debouncedSearch}</span>"
            </span>
          )}
        </div>

        {/* Table */}
        <div className="attendance-table-container">
          <AttendanceTable attendanceData={currentPageData} emptyStateMessage="No matching records found" />
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </>
  );
};

export default DailyAttendance;
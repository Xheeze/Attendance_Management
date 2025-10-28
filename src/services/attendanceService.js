// attendanceService.js
// This service would typically make API calls to your backend

// Mock data for demonstration
const attendanceData = [
  { id: 1, name: 'John Doe', department: 'Engineering', date: '2025-09-16', status: 'Present', timeIn: '09:00', timeOut: '18:00' },
  { id: 2, name: 'Jane Smith', department: 'Marketing', date: '2025-09-16', status: 'Late', timeIn: '09:30', timeOut: '18:15' },
  { id: 3, name: 'Mike Johnson', department: 'HR', date: '2025-09-16', status: 'Absent', timeIn: '-', timeOut: '-' },
  { id: 4, name: 'Sarah Williams', department: 'Engineering', date: '2025-09-16', status: 'Present', timeIn: '08:50', timeOut: '17:45' },
  { id: 5, name: 'David Brown', department: 'Marketing', date: '2025-09-16', status: 'Present', timeIn: '08:55', timeOut: '18:05' },
  { id: 6, name: 'Emily Davis', department: 'HR', date: '2025-09-16', status: 'Present', timeIn: '09:05', timeOut: '18:00' },
  { id: 7, name: 'Michael Wilson', department: 'Engineering', date: '2025-09-16', status: 'Late', timeIn: '09:45', timeOut: '18:30' },
  { id: 8, name: 'Jessica Moore', department: 'Marketing', date: '2025-09-16', status: 'Absent', timeIn: '-', timeOut: '-' },
  { id: 9, name: 'Daniel Taylor', department: 'Engineering', date: '2025-09-16', status: 'Present', timeIn: '08:45', timeOut: '17:30' },
  { id: 10, name: 'Olivia Anderson', department: 'HR', date: '2025-09-16', status: 'Present', timeIn: '09:00', timeOut: '18:00' },
];

const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'];
const statuses = ['Present', 'Absent', 'Late'];

/**
 * Fetch attendance records with optional filters
 * @param {Object} filters - Filter criteria
 * @param {string} filters.department - Department to filter by
 * @param {string} filters.date - Date to filter by (YYYY-MM-DD)
 * @param {string} filters.status - Status to filter by
 * @param {number} page - Page number for pagination
 * @param {number} pageSize - Number of items per page
 * @returns {Object} Attendance data and pagination info
 */
export const getAttendance = (filters = {}, page = 1, pageSize = 5) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    // Apply filters
    let filteredData = [...attendanceData];
    
    if (filters.department) {
      filteredData = filteredData.filter(item => item.department === filters.department);
    }
    
    if (filters.date) {
      filteredData = filteredData.filter(item => item.date === filters.date);
    }
    
    if (filters.status) {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    
    // Pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
    
    // Simulate network delay
    setTimeout(() => {
      resolve({
        data: paginatedData,
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
        }
      });
    }, 300);
  });
};

/**
 * Get the list of departments
 * @returns {Array} List of departments
 */
export const getDepartments = () => {
  return departments;
};

/**
 * Get the list of attendance statuses
 * @returns {Array} List of status values
 */
export const getStatuses = () => {
  return statuses;
};

/**
 * Update attendance record
 * @param {number} id - Attendance record ID
 * @param {Object} data - Updated data
 * @returns {Object} Updated attendance record
 */
export const updateAttendance = (id, data) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    // Find and update record
    const index = attendanceData.findIndex(item => item.id === id);
    if (index !== -1) {
      attendanceData[index] = { ...attendanceData[index], ...data };
      setTimeout(() => {
        resolve({ success: true, data: attendanceData[index] });
      }, 300);
    } else {
      setTimeout(() => {
        resolve({ success: false, error: 'Record not found' });
      }, 300);
    }
  });
};

export default {
  getAttendance,
  getDepartments,
  getStatuses,
  updateAttendance
};


import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../pages/Dashboard';
import DailyAttendance from '../pages/DailyAttendance';
import MonthlyReport from '../pages/MonthlyReport';
import UpdateRegister from '../pages/UpdateRegister';
import Employees from '../pages/Employees';
import Settings from '../pages/Settings';
import '../pages/DailyAttendance.css';

const initialEmployees = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', role: 'Frontend Dev', status: 'Active', joined: '2023-02-14' },
  { id: 2, name: 'Bob Smith', department: 'HR', role: 'Recruiter', status: 'Active', joined: '2022-07-01' },
  { id: 3, name: 'Carla Gomez', department: 'Finance', role: 'Accountant', status: 'On Leave', joined: '2021-11-22' },
  { id: 4, name: 'Daniel Lee', department: 'Engineering', role: 'Backend Dev', status: 'Inactive', joined: '2019-05-03' },
];

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // dashboard | attendance | monthly | employees | settings
  const [addEmployeeTrigger, setAddEmployeeTrigger] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingPage, setPendingPage] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);

  const handleMenuToggle = () => setIsSidebarOpen((v) => !v);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  // Close sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavigate = (pageKey) => {
    // Protect Update Register
    if (pageKey === 'register' && !isAuthenticated) {
      setPendingPage('register');
      setCurrentPage('login');
    } else {
      setCurrentPage(pageKey);
    }
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleQuickAddEmployee = () => {
    setCurrentPage('employees');
    setAddEmployeeTrigger((t) => t + 1);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  // Simple CSV export for today's visible data (stub)
  const handleExportToday = () => {
    const headers = ['ID','Name','Status','In','Out'];
    const rows = [
      ['E-1003','John Smith','Present','09:00','17:00'],
      ['E-1004','Sarah Johnson','Present','09:30','17:30'],
      ['E-1005','Robert Davis','Present','14:00','22:00'],
    ];
    const csv = [headers, ...rows].map(r => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-today.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  let content = null;
  switch (currentPage) {
    case 'dashboard':
      content = (
        <Dashboard
          onAddEmployee={handleQuickAddEmployee}
          onViewMonthly={() => handleNavigate('monthly')}
          onExportToday={handleExportToday}
        />
      );
      break;
    case 'attendance':
      content = <DailyAttendance />;
      break;
    case 'monthly':
      content = <MonthlyReport />;
      break;
    case 'register':
      content = <UpdateRegister employees={employees} />;
      break;
    case 'employees':
      content = <Employees openAddTrigger={addEmployeeTrigger} employees={employees} setEmployees={setEmployees} />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    case 'login':
      content = (
        <div className="content-card" style={{ maxWidth: 420 }}>
          <h1 className="page-title">Login</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Login is required to access Update Register.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => { setIsAuthenticated(true); setCurrentPage(pendingPage || 'dashboard'); setPendingPage(null); }}>Login</button>
            <button className="btn" onClick={() => setCurrentPage('dashboard')}>Cancel</button>
          </div>
        </div>
      );
      break;
    default:
      content = <Dashboard />;
  }

  return (
    <div className="attendance-page">
      <Header 
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={isSidebarOpen}
        onLogoClick={() => handleNavigate('dashboard')}
        isAuthenticated={isAuthenticated}
        onLogout={() => { setIsAuthenticated(false); setCurrentPage('dashboard'); }}
        onLogin={() => handleNavigate('login')}
      />
      <div className="main-content">
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((v) => !v)}
          onClose={handleSidebarClose}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        <main className="content-area">{content}</main>
      </div>
    </div>
  );
};

export default MainLayout;

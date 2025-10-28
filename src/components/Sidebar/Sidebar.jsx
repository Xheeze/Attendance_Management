// Sidebar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ isOpen, isCollapsed, onToggleCollapse, onClose, onNavigate, currentPage }) => {
  const menuItems = [
    { key: 'dashboard', name: 'Dashboard', icon: '📊' },
    { key: 'attendance', name: 'Daily Attendance', icon: '📅' },
    { key: 'monthly', name: 'Monthly Report', icon: '📈' },
  { key: 'register', name: 'Update Register', icon: '✍️' },
    { key: 'employees', name: 'Employees', icon: '👥' },
    { key: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Mobile close button */}
        <div className="sidebar-header">
          <button 
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <span className="close-icon">&times;</span>
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <div className="sidebar-collapse">
          <button className="collapse-button" onClick={onToggleCollapse} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? '»' : '«'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key} className="sidebar-menu-item">
                <button
                  type="button"
                  className={`sidebar-menu-link ${currentPage === item.key ? 'sidebar-menu-link-active' : ''}`}
                  onClick={() => onNavigate(item.key)}
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  {!isCollapsed && <span className="sidebar-menu-text">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Sidebar;

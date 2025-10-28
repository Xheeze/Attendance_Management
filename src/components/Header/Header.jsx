// Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ onMenuToggle, isSidebarOpen, onLogoClick, isAuthenticated, onLogin, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Expanded Logo Section - Far Left */}
        <div className="header-logo-expanded">
          <button type="button" onClick={onLogoClick} className="logo-container" aria-label="Go to dashboard" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            {/* ZOE Logo */}
            <img 
              src="/src/ZOE.png" 
              alt="ZOE Logo" 
              className="logo-image"
              onError={(e) => {
                // Fallback if logo image fails to load
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback logo with company initials */}
            <div className="logo-fallback">
              <span className="logo-text">ZOE</span>
            </div>
          </button>
          <div className="header-title-container">
            <h1 className="header-title">Attendance System</h1>
            <span className="header-subtitle">Employee Management</span>
          </div>
        </div>
        <div className="header-user">
          {isAuthenticated ? (
            <>
              <span className="header-username">Admin</span>
              <div className="header-avatar" title="Logout" onClick={onLogout}>
                A
              </div>
            </>
          ) : (
            <button className="btn btn-outline" onClick={onLogin}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;

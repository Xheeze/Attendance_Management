// Employees.jsx
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Employees.css';

const Employees = ({ openAddTrigger, employees, setEmployees }) => {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState({ name: '', department: 'Engineering', role: '', status: 'Active', joined: '' });

  const departments = ['Engineering', 'HR', 'Finance'];

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || [e.name, e.department, e.role].some((v) => v.toLowerCase().includes(q));
      const matchesDept = department === 'all' || e.department === department;
      const matchesStatus = status === 'all' || e.status === status;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [employees, query, department, status]);

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => {
    setShowAdd(false);
    setForm({ name: '', department: 'Engineering', role: '', status: 'Active', joined: '' });
  };

  const openEdit = (employee) => {
    setEditingEmployee(employee);
    setForm({ name: employee.name, department: employee.department, role: employee.role, status: employee.status, joined: employee.joined });
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setEditingEmployee(null);
    setForm({ name: '', department: 'Engineering', role: '', status: 'Active', joined: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // Open the Add modal when trigger increments
  useEffect(() => {
    if (openAddTrigger > 0) setShowAdd(true);
  }, [openAddTrigger]);

  // Focus management for modals
  useEffect(() => {
    if (showAdd || showEdit) {
      const firstInput = document.querySelector('.modal input');
      firstInput?.focus();
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          showAdd ? closeAdd() : closeEdit();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showAdd, showEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.joined) return;
    const next = { id: Date.now(), ...form };
    setEmployees((prev) => [next, ...prev]);
    closeAdd();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.joined) return;
    setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...form } : emp)));
    closeEdit();
  };

  return (
    <>
      <h1 className="page-title">Employees</h1>

      <div className="content-card employees-controls">
        <div className="search-group">
          <input
            className="input"
            placeholder="Search by name, role, department…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filters-group">
          <select className="select" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="btn btn-primary" onClick={openAdd}>Add Employee</button>
        </div>
      </div>

      <div className="content-card">
        <div className="table-responsive">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.department}</td>
                  <td>{e.role}</td>
                  <td>
                    <span className={`badge badge-${e.status.replace(' ', '').toLowerCase()}`}>{e.status}</span>
                  </td>
                  <td>{new Date(e.joined).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon" 
                        onClick={() => openEdit(e)} 
                        title={`Edit ${e.name}`}
                        aria-label={`Edit ${e.name}`}
                      >
                        <span aria-hidden="true">✏️</span>
                        <span className="sr-only">Edit</span>
                      </button>
                      <button 
                        className="btn-icon btn-icon-danger" 
                        onClick={() => handleDelete(e.id)} 
                        title={`Delete ${e.name}`}
                        aria-label={`Delete ${e.name}`}
                      >
                        <span aria-hidden="true">🗑️</span>
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row">No employees match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={closeAdd}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Employee</h3>
              <button className="icon-button" onClick={closeAdd} aria-label="Close">&times;</button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="add-employee-name">Name</label>
                <input id="add-employee-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-row">
                <label htmlFor="add-employee-department">Department</label>
                <select id="add-employee-department" className="select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="add-employee-role">Role</label>
                <input id="add-employee-role" className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div className="form-row">
                <label htmlFor="add-employee-status">Status</label>
                <select id="add-employee-status" className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="add-employee-joined">Joined</label>
                <input id="add-employee-joined" type="date" className="input" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={closeAdd}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Employee</h3>
              <button className="icon-button" onClick={closeEdit} aria-label="Close">&times;</button>
            </div>
            <form className="modal-body" onSubmit={handleEditSubmit}>
              <div className="form-row">
                <label htmlFor="edit-employee-name">Name</label>
                <input id="edit-employee-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-row">
                <label htmlFor="edit-employee-department">Department</label>
                <select id="edit-employee-department" className="select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="edit-employee-role">Role</label>
                <input id="edit-employee-role" className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div className="form-row">
                <label htmlFor="edit-employee-status">Status</label>
                <select id="edit-employee-status" className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="edit-employee-joined">Joined</label>
                <input id="edit-employee-joined" type="date" className="input" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Employees;

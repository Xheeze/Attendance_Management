// UpdateRegister.jsx
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UpdateRegister.css';

const statuses = ['Present', 'Absent', 'Late', 'Weekly Off', 'On Leave'];

const UpdateRegister = ({ employees }) => {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [dirty, setDirty] = useState(false);

  // Initialize register from employees list
  useEffect(() => {
    if (employees && employees.length > 0) {
      const registerRows = employees.map((emp) => ({
        id: `E-${emp.id}`,
        name: emp.name,
        inTime: '09:00',
        outTime: '17:00',
        status: emp.status === 'Active' ? 'Present' : emp.status === 'On Leave' ? 'On Leave' : 'Absent',
      }));
      setRows(registerRows);
    }
  }, [employees]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return rows;
    return rows.filter((r) => [r.id, r.name, r.status].some((v) => String(v).toLowerCase().includes(q)));
  }, [rows, query]);

  const updateRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setDirty(true);
  };

  const reset = () => {
    // Reset from employees data
    if (employees && employees.length > 0) {
      const registerRows = employees.map((emp) => ({
        id: `E-${emp.id}`,
        name: emp.name,
        inTime: '09:00',
        outTime: '17:00',
        status: emp.status === 'Active' ? 'Present' : emp.status === 'On Leave' ? 'On Leave' : 'Absent',
      }));
      setRows(registerRows);
    }
    setDirty(false);
  };

  const save = async () => {
    // Simulate API
    await new Promise((r) => setTimeout(r, 600));
    setDirty(false);
    alert('Register saved');
  };

  return (
    <>
      <h1 className="page-title">Update Register</h1>
      <div className="content-card ur-controls">
        <input className="input" placeholder="Search by name or ID" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="spacer" />
        <button className="btn" onClick={reset} disabled={!dirty}>Cancel</button>
        <button className="btn btn-primary" onClick={save} disabled={!dirty}>Save Changes</button>
      </div>

      <div className="content-card">
        <div className="table-responsive">
          <table className="ur-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>In</th>
                <th>Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>
                    <input type="time" className="input input-sm" value={r.inTime} onChange={(e) => updateRow(r.id, { inTime: e.target.value })} aria-label={`In time for ${r.name}`} />
                  </td>
                  <td>
                    <input type="time" className="input input-sm" value={r.outTime} onChange={(e) => updateRow(r.id, { outTime: e.target.value })} aria-label={`Out time for ${r.name}`} />
                  </td>
                  <td>
                    <select className="select select-sm" value={r.status} onChange={(e) => updateRow(r.id, { status: e.target.value })} aria-label={`Status for ${r.name}`}>
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

UpdateRegister.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UpdateRegister;

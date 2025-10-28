// Settings.jsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    company: 'Acme Solutions',
    timezone: 'UTC',
    workStart: '09:00',
    workEnd: '17:30',
    weekStartsOn: 'Monday',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    // Simulate save
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <h1 className="page-title">Settings</h1>
      <form className="content-card settings-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="settings-company">Company Name</label>
          <input id="settings-company" className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
        </div>
        <div className="form-row">
          <label htmlFor="settings-timezone">Timezone</label>
          <select id="settings-timezone" className="select" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
            <option value="CST">CST</option>
            <option value="PST">PST</option>
          </select>
        </div>
        <div className="grid-2">
          <div className="form-row">
            <label htmlFor="settings-work-start">Working Hours Start</label>
            <input id="settings-work-start" type="time" className="input" value={form.workStart} onChange={(e) => setForm({ ...form, workStart: e.target.value })} />
          </div>
          <div className="form-row">
            <label htmlFor="settings-work-end">Working Hours End</label>
            <input id="settings-work-end" type="time" className="input" value={form.workEnd} onChange={(e) => setForm({ ...form, workEnd: e.target.value })} />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="settings-week-starts">Week Starts On</label>
          <select id="settings-week-starts" className="select" value={form.weekStartsOn} onChange={(e) => setForm({ ...form, weekStartsOn: e.target.value })}>
            <option>Sunday</option>
            <option>Monday</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && <span className="save-indicator">Saved</span>}
        </div>
      </form>
    </>
  );
};

export default Settings;

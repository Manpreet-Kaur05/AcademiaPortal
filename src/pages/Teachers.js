import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const Teachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '', first_name: '', last_name: '', password: '',
    university_name: '', gender: '', year_joined: '', subject: '', phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    fetchTeachers();
  }, [navigate]);

  const fetchTeachers = async () => {
    try {
      const res = await API.get('/teachers');
      setTeachers(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('/teacher/create', formData);
      setSuccess('Teacher added successfully!');
      setShowForm(false);
      setFormData({
        email: '', first_name: '', last_name: '', password: '',
        university_name: '', gender: '', year_joined: '', subject: '', phone: '',
      });
      fetchTeachers();
    } catch (err) {
      setError(JSON.stringify(err.response?.data?.message) || 'Failed to add teacher');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.title}>👨‍🏫 Teachers</h2>
          <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Close' : '+ Add Teacher'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add New Teacher</h3>
            <form onSubmit={handleSubmit}>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <input name="first_name" value={formData.first_name} onChange={handleChange} style={styles.input} placeholder="First name" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input name="last_name" value={formData.last_name} onChange={handleChange} style={styles.input} placeholder="Last name" required />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder="Email" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input name="password" type="password" value={formData.password} onChange={handleChange} style={styles.input} placeholder="Password" required />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>University</label>
                  <input name="university_name" value={formData.university_name} onChange={handleChange} style={styles.input} placeholder="University name" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} style={styles.input} placeholder="Subject" required />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input} required>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Year Joined</label>
                  <input name="year_joined" type="number" value={formData.year_joined} onChange={handleChange} style={styles.input} placeholder="e.g. 2020" required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} style={styles.input} placeholder="Phone number" required />
                </div>
              </div>
              <button type="submit" style={styles.submitBtn}>Add Teacher</button>
            </form>
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>University</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Year Joined</th>
                  <th style={styles.th}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t, i) => (
                  <tr key={t.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>{t.first_name} {t.last_name}</td>
                    <td style={styles.td}>{t.email}</td>
                    <td style={styles.td}>{t.university_name}</td>
                    <td style={styles.td}>{t.subject}</td>
                    <td style={styles.td}>{t.gender}</td>
                    <td style={styles.td}>{t.year_joined}</td>
                    <td style={styles.td}>{t.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {teachers.length === 0 && (
              <div style={styles.noData}>No teachers found. Add one!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f1a' },
  content: { padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { color: '#ffffff' },
  addBtn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  formCard: { backgroundColor: '#1a1a2e', padding: '25px', borderRadius: '12px', marginBottom: '25px' },
  formTitle: { color: '#e94560', marginBottom: '20px' },
  row: { display: 'flex', gap: '15px' },
  inputGroup: { marginBottom: '15px', flex: 1 },
  label: { color: '#a0a0b0', display: 'block', marginBottom: '5px', fontSize: '13px' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #2a2a4a', backgroundColor: '#0f0f1a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' },
  submitBtn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  tableWrapper: { backgroundColor: '#1a1a2e', borderRadius: '12px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#e94560' },
  th: { padding: '14px', color: 'white', textAlign: 'left', fontSize: '14px' },
  trEven: { backgroundColor: '#1a1a2e' },
  trOdd: { backgroundColor: '#16162a' },
  td: { padding: '12px 14px', color: '#d0d0e0', fontSize: '14px', borderBottom: '1px solid #2a2a4a' },
  loading: { color: '#ffffff', textAlign: 'center', padding: '40px' },
  noData: { color: '#a0a0b0', textAlign: 'center', padding: '40px' },
  error: { backgroundColor: '#ff000020', color: '#ff6b6b', padding: '10px', borderRadius: '6px', marginBottom: '15px' },
  success: { backgroundColor: '#00ff0020', color: '#6bff6b', padding: '10px', borderRadius: '6px', marginBottom: '15px' },
};

export default Teachers;
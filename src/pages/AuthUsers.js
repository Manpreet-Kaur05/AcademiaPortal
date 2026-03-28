import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const AuthUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/auth-users');
      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.title}>👥 Registered Users</h2>
        </div>

        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>First Name</th>
                  <th style={styles.th}>Last Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>{u.first_name}</td>
                    <td style={styles.td}>{u.last_name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span style={u.is_active == 1 ? styles.active : styles.inactive}>
                        {u.is_active == 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={styles.td}>{u.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div style={styles.noData}>No users found.</div>
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
  tableWrapper: { backgroundColor: '#1a1a2e', borderRadius: '12px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#e94560' },
  th: { padding: '14px', color: 'white', textAlign: 'left', fontSize: '14px' },
  trEven: { backgroundColor: '#1a1a2e' },
  trOdd: { backgroundColor: '#16162a' },
  td: { padding: '12px 14px', color: '#d0d0e0', fontSize: '14px', borderBottom: '1px solid #2a2a4a' },
  loading: { color: '#ffffff', textAlign: 'center', padding: '40px' },
  noData: { color: '#a0a0b0', textAlign: 'center', padding: '40px' },
  active: { backgroundColor: '#00ff0020', color: '#6bff6b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' },
  inactive: { backgroundColor: '#ff000020', color: '#ff6b6b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' },
};

export default AuthUsers;
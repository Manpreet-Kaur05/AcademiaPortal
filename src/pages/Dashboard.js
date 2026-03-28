import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined') {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.log('User parse error', e);
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.welcomeCard}>
          <h1 style={styles.welcome}>👋 Welcome Back!</h1>
          {user && (
            <h2 style={styles.name}>
              {user.first_name} {user.last_name}
            </h2>
          )}
          {user && <p style={styles.email}>{user.email}</p>}
        </div>

        <div style={styles.cardsRow}>
          <div style={styles.card} onClick={() => navigate('/teachers')}>
            <div style={styles.cardIcon}>👨‍🏫</div>
            <h3 style={styles.cardTitle}>Teachers</h3>
            <p style={styles.cardDesc}>View all registered teachers</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/auth-users')}>
            <div style={styles.cardIcon}>👥</div>
            <h3 style={styles.cardTitle}>Users</h3>
            <p style={styles.cardDesc}>View all registered users</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/teachers')}>
            <div style={styles.cardIcon}>🏫</div>
            <h3 style={styles.cardTitle}>Universities</h3>
            <p style={styles.cardDesc}>View university data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f1a' },
  content: { padding: '40px' },
  welcomeCard: {
    backgroundColor: '#1a1a2e',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    borderLeft: '5px solid #e94560',
  },
  welcome: { color: '#ffffff', marginBottom: '10px' },
  name: { color: '#e94560', marginBottom: '5px' },
  email: { color: '#a0a0b0' },
  cardsRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: {
    backgroundColor: '#1a1a2e',
    padding: '30px',
    borderRadius: '12px',
    flex: '1',
    minWidth: '200px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #2a2a4a',
  },
  cardIcon: { fontSize: '40px', marginBottom: '15px' },
  cardTitle: { color: '#ffffff', marginBottom: '10px' },
  cardDesc: { color: '#a0a0b0', fontSize: '14px' },
};

export default Dashboard;
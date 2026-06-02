import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('All fields are required');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Invalid email format');
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate('/scene');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e', color: '#fff' }}>
      <div style={{ backgroundColor: '#16213e', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Login</h2>
        {error && <div style={{ color: '#e63946', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#1a1a2e', color: '#fff' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#1a1a2e', color: '#fff' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#e63946', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/signup" style={{ color: '#e63946', textDecoration: 'none' }}>Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/authApi';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      return setError('All fields are required');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Invalid email format');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await signup({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e', color: '#fff' }}>
      <div style={{ backgroundColor: '#16213e', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Signup</h2>
        {error && <div style={{ color: '#e63946', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#1a1a2e', color: '#fff' }}
          />
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
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/login" style={{ color: '#e63946', textDecoration: 'none' }}>Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

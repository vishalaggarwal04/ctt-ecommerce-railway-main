import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUsers } from '../data/products';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Find user in dummy data
    const user = dummyUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Login successful
      onLogin({
        email: user.email,
        name: user.name,
        role: user.role
      });
      // Redirect to shop page
      navigate('/shop');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@cttapp.com');
    setPassword('demo123');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🎯 Welcome to CTT App</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Email:</strong> demo@cttapp.com</p>
          <p><strong>Password:</strong> demo123</p>
          <button 
            type="button" 
            onClick={fillDemoCredentials}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Fill Demo Credentials
          </button>
          
          <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
            <p><strong>Other accounts:</strong></p>
            <p>• admin@cttapp.com / admin123</p>
            <p>• john@cttapp.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

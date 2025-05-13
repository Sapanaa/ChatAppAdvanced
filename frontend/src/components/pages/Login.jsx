import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { loginUser } from '../api/auth'; // Import loginUser function

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the loginUser function from auth.js
      const data = await loginUser(email, password);

      // If login is successful, store the token and call onLogin
      localStorage.setItem('token', data.token); // Store the JWT token in localStorage
      onLogin(data.token); // Pass token to parent component
      console.log('Login successful:', data);

      // Redirect to the dashboard or other protected page after successful login
      navigate('/dashboard'); // Change '/dashboard' to your desired page
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>} {/* Show error if exists */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

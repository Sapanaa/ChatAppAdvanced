import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { registerUser } from '../api/auth'; // Import registerUser function

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the registerUser function from auth.js
      const data = await registerUser(username, email, password);

      // If registration is successful, pass the response to the parent component
      console.log('Registration successful:', data);

      // Redirect to login page after successful registration
      navigate('/login'); // Redirect to the login page after successful registration
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

import { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

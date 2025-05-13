export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    return data; // Returns token and user info
  } else {
    throw new Error(data.error); // Throws an error if login fails
  }
};

export const registerUser = async (username, email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    return data; // Returns user registration success
  } else {
    throw new Error(data.error); // Throws an error if registration fails
  }
};

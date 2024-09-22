import React, { useState } from 'react';
import { API_BASE_URL } from '../constants';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to login:', response);
        return;
      }

      await response.json();
      login();
      navigate('/');
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleRegisterButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to register:', response);
        return;
      }

      await response.json();
      login();
      navigate('/');
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginButtonClick}>
        <label>
          Email:
          <input
            type='email'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Login</button>
      </form>
      <form onSubmit={handleRegisterButtonClick}>
        <label>
          Email:
          <input
            type='email'
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type='password'
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Login;

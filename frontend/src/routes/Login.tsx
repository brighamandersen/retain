import React, { useState } from 'react';
import { API_BASE_URL } from '../constants';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

function Login() {
  const [isOnLogin, setIsOnLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setToastMessage(null);

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
        setToastMessage('Failed to login');
        return;
      }

      await response.json();
      login();
      navigate('/');
    } catch (error) {
      console.error('Network error:', error);
      setToastMessage('Network error');
    }
  };

  const handleRegisterButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setToastMessage(null);

    if (registerPassword !== registerConfirmPassword) {
      console.error('Passwords do not match');
      setToastMessage('Passwords do not match');
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
        setToastMessage('Failed to register');
        return;
      }

      await response.json();
      login();
      navigate('/');
    } catch (error) {
      console.error('Network error:', error);
      setToastMessage('Network error');
    }
  };

  return (
    <div className='login-page'>
      <div className='login-card'>
        {isOnLogin ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginButtonClick}>
              <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='login-register-button'>
                Log In
              </button>
            </form>
            <p className='switch-link'>
              Don't have an account?{' '}
              <button
                onClick={() => setIsOnLogin(false)}
                className='link-button'
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegisterButtonClick}>
              <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className='input-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='login-register-button'>
                Register
              </button>
            </form>
            <p className='switch-link'>
              Already have an account?{' '}
              <button
                onClick={() => setIsOnLogin(true)}
                className='link-button'
              >
                Log in here
              </button>
            </p>
          </>
        )}
      </div>
      <Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
    </div>
  );
}

export default Login;

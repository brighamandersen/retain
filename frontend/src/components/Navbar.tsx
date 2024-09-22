import retainIconPng from '../assets/retain-icon.png';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../useAuth';
import { API_BASE_URL } from '../constants';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const searchbarRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // Unfocus the searchbar when Enter is pressed
    if (event.key === 'Enter' && searchbarRef.current) {
      searchbarRef.current.blur();
    }
  }

  const handleLogOutButtonClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to log out:', response);
        return;
      }

      await response.json();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <nav className='navbar-container'>
      <div className='navbar-left' onClick={() => navigate('/')} role='button'>
        <img src={retainIconPng} alt='Retain icon' width={40} height={40} />
        <p className='navbar-title-text'>Retain</p>
      </div>
      {isAuthenticated && (
        <div className='navbar-searchbar'>
          <button
            aria-label='Search'
            className='navbar-searchbar-button'
            title='Search'
            onClick={() => {
              navigate('/search');
              searchbarRef.current?.focus();
            }}
          >
            <svg
              focusable='false'
              viewBox='0 0 24 24'
              className='navbar-searchbar-svg'
            >
              <path d='M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z'></path>
            </svg>
          </button>
          <input
            ref={searchbarRef}
            className='navbar-searchbar-input'
            type='text'
            placeholder='Search'
            name='text'
            value={query}
            onChange={(e) => {
              navigate('/search');
              const newQuery = e.target.value;
              setSearchParams({ query: newQuery });
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            aria-label='Clear search'
            className={
              query
                ? 'navbar-searchbar-button'
                : 'navbar-searchbar-button invisible'
            }
            onClick={() => {
              setSearchParams({ query: '' });
              searchbarRef.current?.focus();
            }}
            title='Clear search'
            type='reset'
          >
            <svg
              focusable='false'
              viewBox='0 0 24 24'
              className='navbar-searchbar-svg'
            >
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
          </button>
        </div>
      )}
      {isAuthenticated && (
        <div className='navbar-right'>
          <button className='logout-button' onClick={handleLogOutButtonClick}>
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

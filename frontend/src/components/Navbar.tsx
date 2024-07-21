import retainIconPng from '../assets/retain-icon.png';
import { useRef } from 'react';
import SyncStatusButton from './SyncStatusButton';

interface NavbarProps {
  isFetchingNotes: boolean;
  fetchNotes: () => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

function Navbar(props: NavbarProps) {
  const { isFetchingNotes, fetchNotes, searchText, setSearchText } = props;

  const searchbarRef = useRef<HTMLInputElement>(null);

  return (
    <nav className='navbar-container'>
      <div className='navbar-left' onClick={() => setSearchText('')}>
        <img src={retainIconPng} alt='Retain icon' width={40} height={40} />
        <p className='navbar-title-text'>Retain</p>
      </div>
      <div className='navbar-searchbar'>
        <button
          aria-label='Search'
          className='navbar-searchbar-button'
          title='Search'
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button
            aria-label='Clear search'
            className='navbar-searchbar-button'
            onClick={() => {
              setSearchText('');
              searchbarRef.current?.focus();
            }}
            title='Clear search'
          >
            <svg
              focusable='false'
              viewBox='0 0 24 24'
              className='navbar-searchbar-svg'
            >
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
          </button>
        )}
      </div>
      <div className='navbar-right'>
        <SyncStatusButton
          isSyncing={isFetchingNotes}
          performSync={fetchNotes}
        />
      </div>
    </nav>
  );
}

export default Navbar;

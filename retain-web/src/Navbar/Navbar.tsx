import styles from './Navbar.module.css';
import keepIconPng from '../assets/keep-icon.png';

interface NavbarProps {
  isFetchingNotes: boolean;
  fetchNotes: () => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

function Navbar(props: NavbarProps) {
  const { isFetchingNotes, fetchNotes, searchText, setSearchText } = props;

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 16,
        borderBottom: '1px solid #e0e0e0',
        padding: 20
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer'
        }}
        onClick={() => setSearchText('')}
      >
        <img src={keepIconPng} alt='Keep icon' width={40} height={40} />
        <p style={{ fontSize: 22, color: 'rgb(95, 99, 104)' }}>Keep</p>
      </div>
      <div>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div>
        <button disabled={isFetchingNotes} onClick={fetchNotes}>
          {isFetchingNotes ? 'Loading' : 'Refresh'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

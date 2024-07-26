import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className='sidebar'>
      <NavLink
        to='/'
        aria-label='Notes'
        className={({ isActive }) =>
          isActive ? 'sidebar-link active' : 'sidebar-link'
        }
        title='Notes'
      >
        Notes
        {/* <svg className='sidebar-svg' viewBox='0 0 24 24'>
      <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z'></path>
    </svg> */}
      </NavLink>
      <NavLink
        to='/archive'
        aria-label='Archive'
        className={({ isActive }) =>
          isActive ? 'sidebar-link active' : 'sidebar-link'
        }
        title='Archive'
      >
        Archive
        {/* <svg className='sidebar-svg' viewBox='0 0 24 24'>
      <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z'></path>
    </svg> */}
      </NavLink>
    </aside>
  );
}

export default Sidebar;

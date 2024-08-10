import { NavLink } from 'react-router-dom';

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
      </NavLink>
    </aside>
  );
}

export default Sidebar;

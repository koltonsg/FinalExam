import { NavLink } from 'react-router-dom';

const BarNav = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '1rem',
        zIndex: 1000,
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#0d6efd' : '#212529',
          fontWeight: isActive ? 'bold' : 'normal',
          fontSize: '1rem',
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/entertainers"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#0d6efd' : '#212529',
          fontWeight: isActive ? 'bold' : 'normal',
          fontSize: '1rem',
        })}
      >
        Entertainers
      </NavLink>
    </div>
  );
};

export default BarNav;

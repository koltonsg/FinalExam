import { NavLink } from 'react-router-dom';

const BarNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-4">
          <NavLink
            className="navbar-brand fw-semibold"
            to="/"
            style={{ color: '#212529', fontSize: '1.25rem' }}
          >
            Home
          </NavLink>
          <NavLink
            to="/entertainers"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? '#0d6efd' : '#212529',
              fontWeight: isActive ? '500' : '400',
            })}
          >
            Entertainers
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BarNav;

import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../components/css/SideBar.css';

const SideBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
    setSidebarOpen(false);
  };

  const handleSidebarLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <header>
      <nav className="custom-sidebar-navbar">
        <div className="container-fluid">
          {isLoggedIn && (
            <button
              className="custom-sidebar-toggler"
              type="button"
              onClick={handleToggleSidebar}
            >
              <span className="custom-sidebar-toggler-icon">☰</span>
            </button>
          )}
        </div>
      </nav>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={handleSidebarLinkClick}>
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/write" onClick={handleSidebarLinkClick}>
                Write Article
              </Link>
              <br />
              <Link className='nav-link' to="/user">View Your Article</Link>
              <br />
              <Link className="nav-link" to="/edit" onClick={handleSidebarLinkClick}>
                Edit Article
              </Link>
              <br />
              <button className="btn-nav btn-link nav-link" onClick={handleLogoutClick}>
                Logout
              </button>
              <br />
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={handleSidebarLinkClick}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

SideBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default SideBar;
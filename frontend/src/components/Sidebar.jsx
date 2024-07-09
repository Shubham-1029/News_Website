import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
      <nav className={`navbar ${sidebarOpen ? 'open' : ''}`}>
        <div className="container-fluid">
          {isLoggedIn && (
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggleSidebar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleSidebarLinkClick}>
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/write" onClick={handleSidebarLinkClick}>
                      Write Article
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/edit" onClick={handleSidebarLinkClick}>
                      Edit Article
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn-nav btn-link nav-link" onClick={handleLogoutClick}>
                      Logout
                    </button>
                  </li>
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
        </div>
      </nav>
    </header>
  );
};

SideBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default SideBar;

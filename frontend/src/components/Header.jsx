import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/write">
                      Write Article
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogoutClick}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
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

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/politics">Politics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/opinions">Opinions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/style">Style</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/investigations">Investigations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/climate">Climate</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/well-being">Well+Being</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tech">Tech</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/world">World</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dc-md-va">D.C., Md. & Va.</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">Sports</Link>
            </li>
          </ul>
          <button className='btn-subscribe'>Subscribe</button>
          <button className='btn-signin'>Sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

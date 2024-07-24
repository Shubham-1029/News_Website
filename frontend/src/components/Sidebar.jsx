import { Link } from 'react-router-dom';
import '../components/css/SideBar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const handleLinkClick = () => {
        toggleSidebar();
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="btn-container">
                <button className="sub-btn"> Subscribe </button>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search" />
            </div>
            <ul className="sidebar-menu">
                <li><Link to="/" onClick={handleLinkClick}>Home Page</Link></li>
                <li><Link to="/categories/Politics" onClick={handleLinkClick}>Politics</Link></li>
                <li><Link to="/categories/Election2024" onClick={handleLinkClick}>Election 2024</Link></li>
                <li><Link to="/categories/Opinions" onClick={handleLinkClick}>Opinions</Link></li>
                <li><Link to="/categories/Style" onClick={handleLinkClick}>Style</Link></li>
                <li><Link to="/categories/Investigations" onClick={handleLinkClick}>Investigations</Link></li>
                <li><Link to="/categories/Climate" onClick={handleLinkClick}>Climate</Link></li>
                <li><Link to="/categories/Recipes" onClick={handleLinkClick}>Recipes</Link></li>
                <li><Link to="/categories/Well%20Being" onClick={handleLinkClick}>Well+Being</Link></li>
                <li><Link to="/categories/Tech" onClick={handleLinkClick}>Tech</Link></li>
                <li><Link to="/categories/World" onClick={handleLinkClick}>World</Link></li>
                <li><Link to="/categories/Dc" onClick={handleLinkClick}>D.C., Md. & Va.</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

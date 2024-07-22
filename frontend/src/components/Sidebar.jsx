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
                <li><Link to="/tags/Politics" onClick={handleLinkClick}>Politics</Link></li>
                <li><Link to="/tags/Election2024" onClick={handleLinkClick}>Election 2024</Link></li>
                <li><Link to="/tags/Opinions" onClick={handleLinkClick}>Opinions</Link></li>
                <li><Link to="/tags/Style" onClick={handleLinkClick}>Style</Link></li>
                <li><Link to="/tags/Investigations" onClick={handleLinkClick}>Investigations</Link></li>
                <li><Link to="/tags/Climate" onClick={handleLinkClick}>Climate</Link></li>
                <li><Link to="/tags/Recipes" onClick={handleLinkClick}>Recipes</Link></li>
                <li><Link to="/tags/Wellbeing" onClick={handleLinkClick}>Well+Being</Link></li>
                <li><Link to="/tags/Tech" onClick={handleLinkClick}>Tech</Link></li>
                <li><Link to="/tags/World" onClick={handleLinkClick}>World</Link></li>
                <li><Link to="/tags/Dc" onClick={handleLinkClick}>D.C., Md. & Va.</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

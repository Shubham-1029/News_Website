import { Link } from 'react-router-dom';
import '../components/css/SideBar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="btn-container">
                <button className="sub-btn"> Subscribe </button>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search" />
            </div>
            <ul className="sidebar-menu">
                <li><Link to="/">Home Page</Link></li>
                <li><Link to="/tags/Politics">Politics</Link></li>
                <li><Link to="/tags/Election2024">Election 2024</Link></li>
                <li><Link to="/tags/Opinions">Opinions</Link></li>
                <li><Link to="/tags/Style">Style</Link></li>
                <li><Link to="/tags/Investigations">Investigations</Link></li>
                <li><Link to="/tags/Climate">Climate</Link></li>
                <li><Link to="/tags/Recipes">Recipes</Link></li>
                <li><Link to="/tags/Wellbeing">Well+Being</Link></li>
                <li><Link to="/tags/Tech">Tech</Link></li>
                <li><Link to="/tags/World">World</Link></li>
                <li><Link to="/tags/Dc">D.C., Md. & Va.</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

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
                <li><Link to="/politics">Politics</Link></li>
                <li><Link to="/election2024">Election 2024</Link></li>
                <li><Link to="/opinions">Opinions</Link></li>
                <li><Link to="/style">Style</Link></li>
                <li><Link to="/investigations">Investigations</Link></li>
                <li><Link to="/climate">Climate</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/wellbeing">Well+Being</Link></li>
                <li><Link to="/tech">Tech</Link></li>
                <li><Link to="/world">World</Link></li>
                <li><Link to="/dc">D.C., Md. & Va.</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

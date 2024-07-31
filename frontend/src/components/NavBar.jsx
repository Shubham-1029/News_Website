import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPopularCategories, getUserDetails } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../components/css/NavBar.css';

const NavBar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [isBackgroundFaded, setIsBackgroundFaded] = useState(false);
    const [isFading, setisFading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const popularTags = await getPopularCategories();
                setCategories(popularTags);
            } catch (error) {
                console.error('Error fetching popular categories', error);
            }
        };
        fetchTags();

        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token) {
            const fetchUser = async () => {
                try {
                    const userDetails = await getUserDetails();
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user', error);
                }
            };
            fetchUser();
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setisFading(true)
                setShowImage(true);
            } else {
                setisFading(false)
                setShowImage(false);
                
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogin = () => {
        navigate('/login');
        setIsLoggedIn(true);
        localStorage.setItem('token', 'yourAuthTokenHere');
        getUserDetails().then(userDetails => {
            setUser(userDetails);
        }).catch(error => {
            console.error('Error fetching user', error);
        });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setUser(null);
        setIsDropdownOpen(false); // Close the dropdown
    };

    const handleCategoryClick = (category) => {
        onCategorySelect(category);
        navigate(`/categories/${category}`);
        closeSidebar();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsBackgroundFaded(!isBackgroundFaded); 
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setIsBackgroundFaded(false); 
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className={isBackgroundFaded ? 'faded-background' : 'normal-background'}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
                    <div className="navbar-left">
                        <button onClick={toggleSidebar} style={{ border: 'none' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img">
                                <path fill="currentColor" fillRule="evenodd" d="M7 3H2v1h5zm2 9H2v1H9zM2 7.5h4v1H2zm9.561 1.126a2.333 2.333 0 1 0-1.596-4.385 2.333 2.333 0 0 0 1.596 4.385m2.335-3.332a3.334 3.334 0 0 1-1.585 4.093l1.15 3.16-.94.341-1.155-3.175a3.334 3.334 0 1 1 2.53-4.42Z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img">
                                <path fill="currentColor" d="M7 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0"></path>
                                <path fill="currentColor" fillRule="evenodd" d="M2.32 12c-.178.608-.32 1-.32 1h12s-.142-.392-.32-1c-.292-1.004-.68-2.6-.68-4 0-2.761-1.686-5-5-5S3 5.239 3 8c0 1.4-.388 2.996-.68 4m1.04 0h9.28q-.053-.195-.108-.407C12.274 10.595 12 9.25 12 8c0-1.182-.36-2.173-.992-2.857C10.388 4.471 9.418 4 8 4c-1.419 0-2.388.471-3.008 1.143C4.36 5.827 4 6.818 4 8c0 1.25-.274 2.595-.532 3.593q-.054.213-.109.407" clipRule="evenodd"></path>
                                <path fill="currentColor" d="M6 13a2 2 0 1 0 4 0H9a1 1 0 1 1-2 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {!showImage && categories.map(category => (
                                <li className="nav-item" key={category.id}>
                                    <button className="nav-link navbarlink" onClick={() => handleCategoryClick(category.name)}>{category.name}</button>
                                </li>
                            ))}
                             {showImage && (
                                <div className='washingtonpost'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 62" fill="currentColor" aria-labelledby="masthead" aria-hidden="true" focusable="false" role="img" className="nav-logo" style={{width: '188px' , height: '28px'}}><path fill="#111" d="M23.097 19.081v21.831c2.945-1.593 5.007-4.366 6.008-7.494l.236.12c-.649 7.788-5.95 15.575-14.196 15.575C6.84 49.113.714 42.918.714 33.005c0-7.433 4.83-12.095 11.015-16.285a10.8 10.8 0 0 0-2.769-.354c-4.242 0-6.715 2.891-6.715 5.842H1.89c-.059-.413-.059-.826-.059-1.239 0-5.251 2.769-11.624 9.484-11.624 4.3 0 7.599 3.953 12.605 3.953 2.003 0 4.477-.944 5.478-3.127h.177c-.059 3.836-1.236 7.79-6.479 8.91zm3.18 22.362c-2.945 3.127-6.125 5.782-10.248 5.782-7.657 0-13.547-6.018-13.547-14.75 0-5.133 2.12-7.906 4.476-11.152h-.236c-1.473 1.475-5.36 5.192-5.36 11.505 0 9.677 6.067 15.636 14.019 15.636 5.537 0 9.306-3.834 11.015-6.961l-.118-.06zm2.356-28.616c-1.001 1.888-3.121 4.307-7.421 4.307s-8.246-2.95-11.722-2.95c-3.181 0-5.36 2.124-6.185 3.717l.06.118c1.118-1.12 2.826-2.242 5.595-2.242 4.594 0 7.54 2.833 12.193 2.833 4.948 0 7.186-3.246 7.598-5.723zm-16.375 4.071c-3.004 3.128-5.773 6.55-5.773 13.217 0 3.657 1.237 7.434 4.006 9.794l1.708-.886V23.21l-1.59.826-.295-.59 8.247-4.485c-2.238-.47-4.241-1.474-6.303-2.064zm10.19 2.301c-.412.058-.824.058-1.295.058-.825 0-1.59-.058-2.356-.236V36.25l-7.717 4.192c1.59 1.18 3.534 1.887 6.008 1.887 2.003 0 3.77-.413 5.36-1.121zm-8.481 3.01-1.12.648v15.814l1.12-.59V22.208zm33.869 2.241v20.415c0 5.664-5.007 9.5-10.602 10.62l-.118-.236c2.769-1.357 4.36-4.13 4.36-7.08V27.046l-3.181-2.89-1.237 1.356v16.462l1.767 1.593v.119l-4.771 5.192-5.478-5.015v-.237l2.12-2.242V15.305L36.94 8.64l.118.058V24.51l5.125-5.546 5.36 4.839 1-1.063.472.414zM31.343 43.744v-.118l1.237-1.24V14.303L31.343 15.6v26.196l-1.885 1.889v.117l4.594 4.13.824-.944zM43.36 26.102l-3.828-3.304-.825.885 3.417 3.07v21.24c0 1.416-.295 2.89-.825 3.717l.06.059c1.472-1.063 2.002-2.656 2.002-4.72zM57.202 36.31v3.008l5.713 4.485 3.299-3.54.472.471-7.657 8.201-7.776-6.254-1.177 1.24-.472-.472 1.355-1.416V27.105l11.133-8.142 5.831 9.44zm-4.36 5.193V26.515l-1.236.886v14.692l7.304 5.959.943-1.003-7.01-5.546zm4.478-18.174-.118.06v12.095l5.242-3.835zm1.531-1.18-1.06.767 5.184 8.32 1.06-.768zm47.467 26.728-8.188-7.08-6.243 7.08-8.483-7.317V29.996h-1.649c-1.473 0-2.238.945-2.592 2.065h-.177a9.4 9.4 0 0 1-.294-2.242c0-1.534.413-5.546 4.712-5.546V14.125c0-1.947-2.297-2.714-2.297-5.31 0-3.363 3.18-6.667 9.013-8.734l.236.177c-2.12 1.24-3.24 2.42-3.24 4.957 0 3.895 3.77 2.891 3.77 9.027v2.36l6.892-7.257 7.245 7.14 6.833-7.14 6.596 6.49v21.831l-12.134 11.21zm-21.028-8.26V28.168h-3.3c-1.708 0-2.473 1.12-2.591 2.124l.058.06c.59-.65 1.179-1.003 2.533-1.003h2.061v11.918l7.776 6.727.883-1.063zm0-27.083c0-2.418-2.12-3.245-2.12-4.778 0-2.125.824-3.894 2.12-5.546l-.118-.059c-1.767 1.358-3.416 3.541-3.416 5.664 0 2.125 2.297 3.127 2.297 5.016v10.443h1.237zm12.428 5.901-4.476-4.366-2.356 2.419v20.886l5.36 4.544 1.472-1.653zM99.603 40.5V18.61l-5.007-4.956-.942.944 4.712 4.543v22.008l7.952 6.903.943-.886zm11.427-21.83-3.71-3.542-2.12 2.184v21.005l5.772 5.073.058-.058V18.668zm1.885-.827-4.3-4.189-.883.944 3.946 3.776v24.663l1.237-1.18V17.842zm25.029 31.034-5.596-5.074-5.007 5.074-6.126-5.428-.825.884-.471-.471 1.06-1.121V26.929l11.074-8.025 6.362 4.957 1.12-1.18.471.472-1.296 1.357v16.344l3.122 2.89 1.001-1.062.471.413zm-15.08-6.549v-15.93l-1.236.884v15.636l5.655 5.075.942-.944-5.36-4.72zm9.484-15.517-4.83-3.777-.177.119v17.169l4.006 3.48 1-1.002V26.81zm1.885 16.048V25.926l-5.007-4.072-1.177.826 4.947 3.894V43.45l4.948 4.484.884-.945-4.595-4.129zm20.851-13.217h6.067V42.27l-9.365 6.608c-1.237-1.416-3.005-2.419-5.184-2.419-1.767 0-3.181.59-5.065 2.183l-.295-.118 8.012-11.682h-4.949V25.866l9.838-6.844c1.177.944 2.06 1.474 3.593 1.474 1.178 0 2.886-.236 4.182-1.297l.236.118zm-6.596 15.105c-1.709 0-3.063.59-4.242 1.416v.118c.943-.413 1.885-.53 2.769-.53 1.354 0 3.475.649 4.889 2.301l1.355-1.003c-1.12-1.299-2.474-2.302-4.771-2.302m6.301-9.913h-3.298l-6.892 9.973.059.118c1.708-1.24 3.357-2.065 5.36-2.065 1.767 0 3.593.826 4.712 2.242l.06-.059V34.834zm-8.6 0v-9.498l-1.236.885v9.912h4.77l.943-1.298h-4.476zm12.312-11.564c-1.237.886-1.944 1.357-4.006 1.357-1.178 0-2.592-.53-3.71-1.711l-.118.06v8.613h2.238l5.655-8.26-.06-.06zm-2.827-.531c-1.06 0-2.415-.53-3.3-1.71l-1.472 1.002c1.12 1.357 2.18 1.947 3.828 1.947 1.06 0 2.592-.296 4.183-1.653l.058-.176c-1 .414-2.237.59-3.297.59m1 10.15h-3.828l-.884 1.238h3.476v11.446l1.237-.885v-11.8zm24.799-8.439v20.415c0 5.664-5.007 9.5-10.603 10.62l-.117-.236c2.769-1.357 4.359-4.13 4.359-7.08V27.046l-3.18-2.89-1.238 1.356v16.462l1.767 1.593v.119l-4.77 5.192-5.478-5.015v-.237l2.12-2.242V15.305l6.244-6.666.117.058V24.51l5.125-5.546 5.36 4.839 1.001-1.063.472.414-1.18 1.296zM164.98 43.744v-.118l1.237-1.24V14.303L164.98 15.6v26.196l-1.885 1.889v.118l4.594 4.13.824-.945zm12.016-17.642-3.829-3.304-.824.885 3.416 3.07v21.24c0 1.416-.294 2.89-.824 3.717l.06.059c1.472-1.063 2.002-2.656 2.002-4.72zm15.198 22.775-5.066-4.661-1.179 1.239-.472-.473 1.356-1.474V26.457l-2.474-2.36-.943 1.062-.471-.472 5.3-5.783 4.713 4.249 1.178-1.298.53.413-1.472 1.593v17.23l2.828 2.654 1.296-1.358.47.473zm-3.476-5.782V25.512l-3.063-2.832-.824.945 2.65 2.537v17.524l4.713 4.247.883-.944zm1.767-24.662-4.83-4.425 4.418-4.72 4.83 4.424-4.418 4.72zm-3.004-5.37-.883.885 3.828 3.599.883-1.003zM217.1 48.877l-5.125-4.661V26.988l-3.122-2.832-1.65 1.77v15.93l1.827 1.71v.237l-4.83 5.074-5.478-5.015v-.177l2.12-2.242V26.574l-2.768-2.537-1.12 1.239-.47-.472 5.36-5.841 5.36 4.78v1.18l5.596-5.96 5.241 4.72 1.179-1.239.53.472-1.414 1.475v16.874l2.65 2.478 1.297-1.416.47.472zm-15.55-5.133v-.118c0 .118 1.178-1.18 1.178-1.18V25.688l-3.358-3.068-.825.885 2.945 2.714v15.576l-1.826 1.889v.118l4.536 4.13.942-1.003zm12.31-.472V25.985l-3.652-3.305-.942 1.003 3.357 3.009v17.17l4.417 4.13.943-1.004zm19.85 16.225c-1.942-2.124-3.298-3.009-5.124-3.009-1.943 0-4.182.768-6.479 2.006l-.177-.176 8.129-9.44-5.773-4.602-1.119 1.18-.47-.413 1.294-1.416V26.93l11.192-8.025 6.244 4.957 1.06-1.18.472.472-1.237 1.357v20.18c0 3.067 1.707 2.95 1.707 5.25 0 2.654-3.829 5.132-9.719 9.557zm-7.833-16.343V26.457l-1.237.885v16.344l5.83 4.72.885-1.063zm4.123 11.8c-1.944 0-3.712.59-5.36 1.711v.119c1.06-.413 2.238-.944 4.24-.944 1.827 0 3.358 1.002 4.89 2.773l1.178-.944c-1.473-1.71-3.24-2.714-4.948-2.714zm7.186-5.664c-1.472-.944-1.826-1.947-1.826-4.484v-1.063l-9.778 11.328.059.059c1.884-1.12 3.593-1.946 6.362-1.946 2.356 0 3.946.943 5.772 2.478 1.12-.944 1.885-1.888 1.885-3.363 0-1.18-1.002-2.065-2.474-3.009m-1.826-22.48-4.89-3.834-.118.118v18.113l3.771 2.95 1.237-1.416v-15.93zm3.593 21.654c-1.532-1.18-1.709-2.183-1.709-4.72V25.808l-4.948-4.012-1.118.767 4.83 3.834V44.57c0 2.537.118 3.246 1.708 4.307 1.414.944 2.532 1.947 2.532 3.304 0 .353-.058.944-.058.944l.058.059c.295-.296.649-.767.649-1.535 0-1.297-.648-2.182-1.944-3.185m14.137.413-5.42-4.248-1.118 1.239-.471-.473 1.295-1.415V23.33h-3.417l-.118-.119 2.062-3.069h1.472V16.19l6.244-6.667.118.119v10.501h4.712l.119.119-2.062 3.068h-2.77v17.878l3.241 2.479 1.237-1.358.471.472zm-3.829-33.69-1.237 1.357v3.6h1.237zm0 28.203V23.33h-1.237v20.768l5.007 3.895.883-.944zm28.685-18.35v16.52l-9.954 7.376-7.482-5.664-.883 1.003-.471-.472 1.06-1.18V26.457l10.427-7.494 6.95 5.429 1.118-1.18.472.471-1.237 1.358zm-15.844 16.993V25.926l-1.237.885v15.871l7.068 5.428 1.12-.825zm9.483-15.045-4.948-3.895-.058.06v17.581l5.006 3.776zm1.886-1.062-5.479-4.25-1.118.827 5.36 4.13v18.35l1.237-.943zm26.977 22.95-5.125-4.66V26.988l-3.122-2.832-1.65 1.77v15.93l1.827 1.71v.237l-4.83 5.074-5.478-5.015v-.177l2.12-2.242V26.574l-2.768-2.537-1.12 1.239-.47-.472 5.36-5.841 5.36 4.78v1.18l5.596-5.96 5.242 4.72 1.178-1.239.53.472-1.414 1.475v16.874l2.65 2.478 1.297-1.416.47.472-5.653 6.078zm-15.551-5.132v-.118c0 .118 1.178-1.18 1.178-1.18V25.688l-3.357-3.068-.824.885 2.945 2.714v15.576l-1.826 1.889v.118l4.536 4.13.942-1.003zm12.31-.472V25.985l-3.65-3.305-.943 1.003 3.357 3.009v17.17l4.417 4.13.943-1.004-4.123-3.716zm39.63 5.605c-1.65-1.77-2.238-2.36-4.183-2.891V57.55l-.118.059-2.356-2.125-6.833 6.313-.118-.058V45.868c-2.062.472-4.241 1.534-6.362 3.657l-.118-.058c.413-4.543 2.65-7.906 6.479-9.204V28.757h-1.237c-1.708 0-2.65.885-3.475 2.478h-.176c-.177-.53-.296-1.357-.296-2.713 0-2.479 1.827-5.074 4.831-5.074h.353v-6.373l-2.415-2.183-1.178 1.18-.413-.413 5.95-6.313 5.536 5.074v5.37l1.296-1.417v-6.785h.648v6.195l7.833-8.438 6.656 6.078v25.666zm-13.607-5.192c-2.414.471-4.122 1.947-5.241 3.894l.058.118c1.65-1.416 3.18-2.064 5.183-2.537zm1.886-16.933h-3.24c-2.239 0-3.122 1.416-3.18 3.068l.058.059c.707-1.18 1.413-1.593 2.827-1.77h2.298v32.156l1.237-1.18zm0-10.621-2.946-2.713-.942 1.002 2.65 2.36v6.667h1.238V16.13zm6.892 3.363-1.296 1.357v34.163l1.296 1.18zm7.716-1.357-3.476-3.186-3.593 3.895v20.768c3.063.296 5.183 1.18 7.01 3.186l.059-.059zm-7.069 25.548v1.534c2.003.472 2.827 1.062 4.24 2.714l1.356-1.062c-1.414-1.77-2.828-2.831-5.596-3.186m8.953-26.491-4.005-3.718-.943 1.003 3.711 3.422v27.436l1.237-.944v-27.2zm26.094 7.847v16.52l-9.956 7.375-7.48-5.664-.884 1.003-.471-.472 1.06-1.18V26.457l10.427-7.494 6.95 5.429 1.118-1.18.472.471zm-15.845 16.992V25.926l-1.237.885v15.871l7.068 5.428 1.12-.825zm9.483-15.045-4.947-3.895-.06.06v17.581l5.007 3.776zm1.886-1.062-5.479-4.25-1.118.827 5.36 4.13v18.35l1.237-.943zm18.14 3.716h6.068V42.27l-9.365 6.608c-1.237-1.416-3.004-2.419-5.183-2.419-1.767 0-3.18.59-5.066 2.183l-.294-.118 8.01-11.682h-4.948V25.866l9.837-6.844c1.179.944 2.061 1.474 3.593 1.474 1.179 0 2.886-.236 4.182-1.297l.236.118zm-6.596 15.105c-1.708 0-3.063.59-4.24 1.416v.118c.942-.413 1.884-.53 2.768-.53 1.355 0 3.475.649 4.888 2.301l1.356-1.003c-1.119-1.299-2.474-2.302-4.772-2.302m6.303-9.913h-3.298l-6.891 9.973.058.118c1.708-1.24 3.357-2.065 5.36-2.065 1.767 0 3.593.826 4.712 2.242l.059-.059zm-8.6 0v-9.498l-1.237.885v9.912h4.77l.943-1.298zm12.311-11.564c-1.238.886-1.944 1.357-4.006 1.357-1.179 0-2.593-.53-3.711-1.711l-.118.06v8.613h2.237l5.655-8.26-.057-.06zm-2.828-.531c-1.06 0-2.414-.53-3.298-1.71l-1.473 1.002c1.12 1.357 2.18 1.947 3.83 1.947 1.06 0 2.591-.296 4.182-1.653l.058-.176c-1.001.414-2.238.59-3.299.59m1.002 10.15h-3.828l-.884 1.238h3.475v11.446l1.237-.885v-11.8zm14.255 15.988-5.42-4.248-1.119 1.239-.47-.473 1.294-1.415V23.33h-3.416l-.117-.119 2.06-3.069h1.473V16.19l6.244-6.667.118.119v10.501h4.712l.118.119-2.062 3.068h-2.768v17.878l3.24 2.479 1.237-1.358.47.472zm-3.83-33.69-1.236 1.357v3.6h1.237v-4.957zm0 28.203V23.33h-1.236v20.768l5.006 3.895.884-.944-4.653-3.659z"></path></svg>
                                <h6 className='nav-second'>Democracy Dies in Darkness</h6>
                                </div>
                            )}
                        </ul>
                        <div className="d-flex align-items-center ms-auto">
                            <button className="btn-subscribe">Subscribe</button>
                            {isLoggedIn ? (
                                <div className="dropdown">
                                    <button className="dropbtn" onClick={toggleDropdown}>
                                        {user ? user.username : 'Loading...'}
                                    </button>
                                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} onClick={closeDropdown}>
                                        <Link to={`/write`}>Write</Link>
                                        <a href="#" onClick={handleLogout}>Sign out</a>
                                        <Link to={`/user`}>My Post</Link>
                                        <a href="#">Account Settings</a>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn-signin" onClick={handleLogin}>Sign in</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </div>
    );
};

NavBar.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default NavBar;

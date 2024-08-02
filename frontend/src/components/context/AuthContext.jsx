import { useState, useEffect, createContext, useContext } from 'react';
import { getUserDetails } from '../../api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetails = await getUserDetails();
                setUser(userDetails);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        };

        if (isLoggedIn) {
            fetchUser();
        }
    }, [isLoggedIn]);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        /* window.location.reload(); */
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

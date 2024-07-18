/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import './Navbar.css';
import { Searchbar } from '../navication/Searchbar.jsx';

const Navbar = ({ setShowLogin }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    const getUserDetailsFromLocalStorage = () => {
        try {
            const storedUser = localStorage.getItem('username');
            if (storedUser) {
                return JSON.parse(storedUser);
            } else {
                console.log("No stored user found");
                return null;
            }
        } catch (error) {
            console.error("Error parsing stored user:", error);
            return null;
        }
    };

    useEffect(() => {
        const user = getUserDetailsFromLocalStorage();
        if (user) {
            setUserDetails(user);
        }
    }, []);

    const username = userDetails ? userDetails.Name : 'Your Name';
    const userImage = userDetails && userDetails.ProfilePic ? `http://localhost:8000/${userDetails.ProfilePic}` : null;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get('http://localhost:8000/auth/logout', { withCredentials: true });
            if (res.data.status) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                setUserDetails(null); 
                navigate('/');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleSearchIconClick = () => {
        setShowOffcanvas(true);
    };

    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
    };


    return (
        <div className="Navigation-bar">
            <img className='logo' src='logo.png' alt="logo" />
            <div className="Navbar-content">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

            <div className='Navbar-Right'>
                <div className='mainsearch-box' onClick={handleSearchIconClick}>
                    <p className="search-box"><BsSearch /></p>
                </div>
                <Searchbar
                    show={showOffcanvas}
                    handleClose={handleCloseOffcanvas}
                />
                <div className='addtocollection'>
                    <div className="addtocart">
                        <p> <Link to={'/addtocart'}><FiShoppingCart /></Link> </p>  
                        <div className='collectioncount'>
                            <span className='addtocount'>0</span>
                        </div>
                    </div>
                </div>

                <div className='user-signup'>
                    <button className="sign-up" onClick={() => setShowLogin(true)}>Sign up</button>
                </div>
                <div className="dropdowns">
                    <button className="dropbtns" onClick={toggleDropdown}>
                        {userImage ? (
                            <img className='update-user-image'
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '100%',
                                    border: '1px solid white',
                                    padding: '3px'
                                }}
                                src={userImage}
                                alt={username}
                            />
                        ) : (
                            <FaRegUserCircle
                                className='user-image-icon'
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '100%',
                                    border: '1px solid white',
                                    padding: '3px'
                                }}
                            />
                        )}
                        <p>{username}</p>
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content" onClick={() => setIsDropdownOpen(false)}>
                            <Link to='/Profile'>View Profile</Link>
                            <Link onClick={handleLogout}>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Navbar };

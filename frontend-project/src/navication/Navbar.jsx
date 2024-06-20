/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import './Navbar.css'

const Navbar = ({ setShowLogin }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('username');
            if (storedUser) {
                setUserDetails(JSON.parse(storedUser));
            } else {
                console.log("No stored user found");
            }
        } catch (error) {
            console.error("Error parsing stored user:", error);
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

    return (
        <div className="Navigation-bar">
      <img className='logo' src="logo.png" alt="logo" />
            <div className="Navbar-content">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

            <div className='Navbar-Right'>
                <div className='mainsearch-box' onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <p className="search-box"><BsSearch /></p>
                </div>
                {isSearchOpen && (
                    <div className='searchs-box'>
                        <span className='closeMenuIcon' onClick={() => setIsSearchOpen(false)}><IoCloseSharp /></span>
                        <form action="#" className='searchbar-form'>
                            <input type="text" placeholder='search any' />
                            <button className='searchbutton' type='submit '><BsSearch /></button>
                        </form>
                    </div>
                )}
                <div className='addtocollection'>
                    <div className="addtocart">
                        <p><FiShoppingCart /></p>
                        <div className='collectioncount'>
                            <span className='addtocount'>0</span>
                        </div>
                    </div>
                </div>

                <div className='user-signup'>
                    <button className="sign-up" onClick={() => setShowLogin(true)}>Sign up</button>
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={toggleDropdown}>
                        {userImage ? (
                            <img
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

export { Navbar }

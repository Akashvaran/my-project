import  { useState } from 'react';
import { FaBars, FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const menuItem = [
        { path: "/Profile", name: "Dashboard", icon: <FaTh /> },
        { path: "/about", name: "About", icon: <FaUserAlt /> },
        { path: "/", name: "Analytics", icon: <FaRegChartBar /> },
        { path: "/Service", name: "Comment", icon: <FaCommentAlt /> },
        { path: "/Conduct", name: "Product", icon: <FaShoppingBag /> },
        { path: "/productList", name: "Product List", icon: <FaThList /> }
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="top_section">
                <h1 className={`logos ${isOpen ? 'show' : ''}`}>Logo</h1>
                <div className={!isOpen? "bars":"openbar"} onClick={toggleSidebar}>
                    {!isOpen ? <FaBars /> : <IoCloseSharp />}
                </div>
            </div>
            <ul className="menu-items">
                {menuItem.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path} className="link" activeClassName="active" onClick={closeMenu}>
                            <div className="icon">{item.icon}</div>
                            <div className={`link_text ${isOpen ? 'show' : ''}`}>{item.name}</div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export {Sidebar};
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States/index';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);
  const isLoggedIn = useSelector (state => state.isLoggedIn);  
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  useEffect(() => {
    action.Login(checkLogin());
  },[]);

  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const checkLogin = () => {
    const users = getUsers();
    const user = users.find((user) => user.loggedIn === true);
    return user ? true : false;
  };

  const handleLogout = () => {
    const users = getUsers();
    const updatedUsers = users.map(user => {
      if (user.loggedIn === true) {
        user.loggedIn = false;
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    action.Login(false);
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className="navbar">
      <div className="toggle-button" onClick={toggleLinks}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="logo">
        <img src="https://react-builder-burger.firebaseapp.com/static/media/burger-logo.b8503d26.png" alt="Logo" />
      </div>
      <div className={showLinks ? 'links active' : 'links'}>
        <ul>
          <li>
            <NavLink to="/" className= {activeLink === "/" ? "active-link" : "nav-link"}>
              Build Burger
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/Orders" className={activeLink === "/Orders" ? "active-link" : "nav-link" }>
                Orders
              </NavLink>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <button type="button" className="nav-link" onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/Login" className={activeLink === "/Login" ? "active-link" : "nav-link"}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

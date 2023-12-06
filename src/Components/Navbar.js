import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkLogin());
  }, []);

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
    setIsLoggedIn(false);
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
            <NavLink exact to="/" activeClassName="active-link" className="nav-link">
              Build Burger
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/Orders" activeClassName="active-link" className="nav-link">
                Orders
              </NavLink>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <button type="button" className="nav-link" onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/Login" activeClassName="active-link" className="nav-link">
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

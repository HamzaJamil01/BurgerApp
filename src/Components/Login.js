import React, { useState } from 'react';
import './Login.css';

import { useNavigate } from "react-router-dom";
// Function to get users from localStorage
const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  // Function to set users in localStorage
  const setUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
const Login = ({isLoggedIn,  setIsLoggedIn}) => {
  const [signInMode, setSignInMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (signInMode) {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
          user.loggedIn = true;
          setUsers(users);
          setIsLoggedIn(true);
          navigate('/Checkout');
        } else {
          setErrorMessage('Invalid email or password');
        }
      } else {
        const newUser = { email, password, loggedIn: false };
        users.push(newUser);
        setUsers(users);
        setErrorMessage('Registered successfully!');
      }
  };
  const toggleMode = () => {
    setSignInMode((prevMode) => !prevMode);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <div className="form-box">
      {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div>
              <button type="submit">
                Submit
              </button>
            </div>
            <div>
              <button type="button" className="signIn" onClick={toggleMode}>
                {signInMode ? 'Register' : 'Sign In'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

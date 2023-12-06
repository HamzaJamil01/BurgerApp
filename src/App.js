import './App.css';
import React from 'react'
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Components/Checkout';
import Orders from './Components/Orders';

function App() {
  const [total, setTotal] = useState(3);
  const [items, setItems] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Homepage total={total} setTotal={setTotal} items={items} setItems={setItems} isLoggedIn={isLoggedIn}/>} />
          <Route path="/Login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Checkout" element={<Checkout total={total} setTotal={setTotal} items={items} setItems={setItems}/>} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

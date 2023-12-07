import React, { useState } from 'react';
import Footer from './Footer';
import Burger from './Burger';

const Homepage = ({items, setItems, isLoggedIn}) => {

  return (
    <div>
      <Burger items={items} />
      <Footer items={items} setItems={setItems} isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default Homepage;

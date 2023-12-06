import React, { useState } from 'react';
import Footer from './Footer';
import Burger from './Burger';

const Homepage = ({items, total, setTotal, setItems, isLoggedIn}) => {

  return (
    <div>
      <Burger items={items} />
      <Footer total={total} onTotalChange={setTotal} items={items} setItems={setItems} isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default Homepage;

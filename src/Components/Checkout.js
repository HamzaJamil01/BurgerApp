import React from 'react'
import Burger from './Burger'
import './Checkout.css'
import { useState } from 'react';
import OrderForm from './OrderForm';
import { useNavigate } from 'react-router-dom';

export default function Checkout({items, total, setTotal, setItems}) {
    const [ContinueButton, setContinueButton] = useState(false);
    const navigate = useNavigate();
    const handleContinue = () => {
        setContinueButton(true);
      };
      const handleCancel = () => {
        setItems({
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
          });
          setTotal(3);
          navigate('/');
      };
  return (
    <div>
        <div className='text-div'>
            <h1>We hope it tastes well!</h1>
        </div>
        <Burger total={total} setTotal={setTotal} items={items} setItems={setItems}/>
        <div className='buttons-container'>
            <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
            <button className='continue-btn' onClick={handleContinue}>Continue</button>
        </div>
        {ContinueButton && <OrderForm total={total} setTotal={setTotal} items={items} setItems={setItems}/>} {}
    </div>
  )
}

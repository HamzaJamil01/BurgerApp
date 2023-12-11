import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States/index';
const Footer = () => {
    const isLoggedIn = useSelector (state => state.isLoggedIn);
    const items = useSelector (state => state.items);
    const dispatch = useDispatch();
    const action = bindActionCreators(actionCreators, dispatch)
    const total = useSelector (state => state.total)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    function handleClick(){
        navigate('/Login');
    }
  const handleMore = (item) => {
    const updatedItems = { ...items };
    let priceToAdd = 0;

    switch (item) {
      case 'lettuce':
        priceToAdd = 0.5;
        break;
      case 'bacon':
        priceToAdd = 0.7;
        break;
      case 'cheese':
        priceToAdd = 0.4;
        break;
      case 'meat':
        priceToAdd = 1.3;
        break;
      default:
        break;
    }
debugger;
    updatedItems[item]++;
    action.updateIngrediants(updatedItems);
    action.increaseTotal(priceToAdd);
  };

  const handleLess = (item) => {
    const updatedItems = { ...items };
    let priceToSubtract = 0;

    switch (item) {
      case 'lettuce':
        priceToSubtract = 0.5;
        break;
      case 'bacon':
        priceToSubtract = 0.7;
        break;
      case 'cheese':
        priceToSubtract = 0.4;
        break;
      case 'meat':
        priceToSubtract = 1.3;
        break;
      default:
        break;
    }

    if (updatedItems[item] > 0) {
      updatedItems[item]--;
      action.updateIngrediants(updatedItems);
      action.decreaseTotal(priceToSubtract);
    }
  };
  const handleOrderNow = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleContinue = () => {
    navigate('/Checkout');
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>Current Price: <b>${total}</b></p>
        </div>
        <div className="footer-section">
          <h3>Lettuce</h3>
          <button className="btn less" onClick={() => handleLess('lettuce')} disabled={items['lettuce'] === 0}>Less</button>
          <button className="btn more" onClick={() => handleMore('lettuce')}>More</button>
        </div>
        <div className="footer-section">
          <h3>Bacon</h3>
          <button className="btn less" onClick={() => handleLess('bacon')} disabled={items['bacon'] === 0}>Less</button>
          <button className="btn more" onClick={() => handleMore('bacon')}>More</button>
        </div>
        <div className="footer-section">
          <h3>Cheese</h3>
          <button className="btn less" onClick={() => handleLess('cheese')} disabled={items['cheese'] === 0}>Less</button>
          <button className="btn more" onClick={() => handleMore('cheese')}>More</button>
        </div>
        <div className="footer-section">
          <h3>Meat</h3>
          <button className="btn less" onClick={() => handleLess('meat')} disabled={items['meat'] === 0}>Less</button>
          <button className="btn more" onClick={() => handleMore('meat')}>More</button>
        </div>
        <div className="footer-section">
            {isLoggedIn ? 
                <button className="signup-btn"disabled={items['lettuce'] === 0 && items['bacon'] === 0 && items['cheese'] === 0 && items['meat'] === 0 } onClick={handleOrderNow}>Order Now</button> 
                :
                <button className="signup-btn"disabled={items['lettuce'] === 0 && items['bacon'] === 0 && items['cheese'] === 0 && items['meat'] === 0 } onClick={handleClick}>Signup to Order</button>
            }
        </div>
        <Modal show={showModal} handleClose={handleCloseModal} handleContinue={handleContinue} />
      </div>
    </footer>
  );
};

export default Footer;

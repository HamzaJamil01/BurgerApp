import React, { useState, useEffect } from 'react';
import './OrderForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../States/index';
const OrderForm = ({items, setItems}) => {
  const total = useSelector (state => state.total);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    zipCode: '',
    country: '',
    email: '',
    deliveryOption: 'Fastest',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const formValues = Object.values(formData);
    const isFormFilled = formValues.every((value) => value !== '');
    setIsFormValid(isFormFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
        formData,
        items,
        total,
      };
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));
      setItems({
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      });
      action.resetTotal(3);
      navigate('/');
  };

  return (
    <div className="order-form-container">
      <div className="order-form-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
          >
            <option value="Fastest">Fastest</option>
            <option value="Cheapest">Cheapest</option>
          </select>
          <button type="submit" disabled={!isFormValid}>
            Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

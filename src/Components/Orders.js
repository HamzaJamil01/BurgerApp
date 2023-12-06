import React from 'react';
import './Orders.css';

const Orders = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedInUser = users.find((user) => user.loggedIn === true);
  const loggedInUserEmail = loggedInUser ? loggedInUser.email : '';

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const userOrders = orders.filter(
    (order) => order.formData && order.formData.email === loggedInUserEmail
  );

  return (
    <div className="orders-container">
      {userOrders.map((order, index) => (
        <div key={index} className="order-box">
          <div className="order-info">
          <p>Ingredients:</p>
            <div className="ingredient-list">
              
              {Object.entries(order.items).map(([ingredient, count]) => (
                <div key={ingredient} className="ingredient-item">
                  <span>{ingredient} ({count})</span>
                </div>
              ))}
            </div>
            <p>Price <b>USD {order.total}</b></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

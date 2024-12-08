import React, { useState, useEffect } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [orderId] = useState(Math.floor(Math.random() * 1000000)); 
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      setIsChecked(true);
    }, 500); 
  }, []);

  const handleClose = () => {
   
    window.close(); 
  };

  const handleRedirect = () => {
    
    window.location.href = '/'; 
  };

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-container">
        <div className={`checkmark ${isChecked ? 'checked' : ''}`}></div>
        <p className="thank-you-message">Thanks for ordering with us! Your order is on the way.</p>
        <p className="order-id">Order ID: #657c49d335c535818c8c7786</p>
        <button className="redirect-btn" style={{ marginTop: '30px' }} onClick={handleRedirect}>Go to Homepage</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

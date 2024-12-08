import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shoeSize, setShoeSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(150);
  const [error, setError] = useState('');
  const shoePrice = 150;
  
  const navigate = useNavigate();

  const calculateTotal = useCallback((qty) => {
    const total = shoePrice * qty;
    setTotalPrice(total);
  }, [shoePrice]);

  useEffect(() => {
    calculateTotal(quantity);
  }, [quantity, calculateTotal]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSizeChange = (e) => {
    setShoeSize(e.target.value);
    setError('');
  };

  const handleQuantityChange = (e) => {
    const qty = e.target.value;

    if (qty === "") {
      setError('');
      setQuantity(qty);
      setTotalPrice(0);
      return;
    }

    if (isNaN(qty) || qty < 1) {
      setError('Quantity must be at least 1');
      setQuantity(1);
      setTotalPrice(shoePrice);
    } else {
      setError('');
      setQuantity(qty);
    }
  };

  const handleOrderSubmit = () => {
    if (!name) {
      setError('Please enter your name.');
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!shoeSize) {
      setError('Please select a shoe size before ordering.');
      return;
    }

    navigate('/order-confirmation');
  };

  return (
    <div className="order-page-wrapper">
      <div className="order-container">
        <header className="order-header">
          <h1 className="order-title">
            Your customized pair of shoes is one click away
            <img
              src="img/img2.png"
              alt="Shoe"
              className="shoe-image"
            />
          </h1>
      
        </header>

        <form className="order-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`form-input ${error && !name ? 'error' : ''}`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`form-input ${error && (!email || !/\S+@\S+\.\S+/.test(email)) ? 'error' : ''}`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="size" className="form-label">Shoe size (EU):</label>
            <select
              id="size"
              value={shoeSize}
              onChange={handleSizeChange}
              className={`form-input ${error && !shoeSize ? 'error' : ''}`}
            >
              <option value="srt">Select size</option>
              {['39', '40', '41', '42', '43', '44', '45', '46'].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className={`form-input ${error && quantity < 1 ? 'error' : ''}`}
            />
          </div>

          <div className="price-details">
            <p className="price-info">
              <span>Price per pair:</span> <span className="price">€{shoePrice}</span>
            </p>
            <p className="total-price">
              <span>Total:</span> <span className="price">€{totalPrice}</span>
            </p>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="button"
            onClick={handleOrderSubmit}
            className="order-button"
            style={{ backgroundColor: "#26f158" }}
            disabled={!name || !email || !shoeSize || quantity < 1}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;

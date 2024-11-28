import React, { useState } from 'react';
import './OrderPage.css';

const OrderPage = () => {
  const [shoeSize, setShoeSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const shoePrice = 150; // Premium prijs per paar

  const handleSizeChange = (e) => {
    setShoeSize(e.target.value);
    calculateTotal();
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    calculateTotal();
  };

  const calculateTotal = () => {
    setTotalPrice(shoePrice * quantity);
  };

  const handleOrderSubmit = () => {
    alert('Bestelling geplaatst!');
    // Voeg logica toe om de bestelling te plaatsen
  };

  return (
    <div className="order-page-wrapper">
      <div className="order-container">
        <div className="order-header">
          <h1 className="order-title">Bestel je schoenen</h1>
          <p className="order-subtitle">Exclusief voor jou, de perfecte pasvorm en stijl.</p>
        </div>
        
        <div className="order-form">
          <div className="form-group">
            <label htmlFor="size" className="form-label">Schoenmaat (EU):</label>
            <select
              id="size"
              value={shoeSize}
              onChange={handleSizeChange}
              className="form-input"
            >
              <option value="">Selecteer maat</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Hoeveelheid:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="form-input"
            />
          </div>

          <div className="price-details">
            <p>Prijs per paar: <span className="price">€{shoePrice}</span></p>
            <p className="total-price">Totaal: <span className="price">€{totalPrice}</span></p>
          </div>

          <button
            onClick={handleOrderSubmit}
            className="order-button"
            disabled={!shoeSize || quantity < 1}
          >
            Bestelling plaatsen
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

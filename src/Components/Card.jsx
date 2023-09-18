import React from 'react';
import './Style/Card.css';

export default function Card({ products }) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.Image} alt="Card Image" />
          <div className="card-info">
            <h2 className="card-title">{product.Title}</h2>
            <p className="card-category">{product.Category}</p>
            <p className="card-description">{product.Des}</p>
            <p className="card-price">${product.Price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

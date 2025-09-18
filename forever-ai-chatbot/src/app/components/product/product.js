"use client"

import "./product.css"

export default function Product({ picture, name, price, oldPrice, link }) {
    return (
        <div className="product-card">
            <img src={picture} alt={name} className="product-image" />
            <div className="product-name">{name}</div>
            <div className="product-prices">
                <span className="product-price">{price} RON</span>
                {oldPrice && (
                    <span className="product-oldprice">{oldPrice} RON</span>
                )}
            </div>
            <button
                className="product-link-btn"
                onClick={() => window.open(link, "_blank")}
            >
                Buy Now
            </button>
        </div>
    );
}
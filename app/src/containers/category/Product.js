import React, { Component } from 'react'
import { getProductImageLink } from "../../utils/imageUtils"
import './Product.scss';

export default class Product extends Component {
  render() {
    const product = this.props.product
    return (
       <a href={product.url} className="product-card product-link">
          <img className="product-image" src={getProductImageLink(this.props.product)} alt={product.name}/>
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description.slice(0, 40)}</p>
          <div className="bottom-info">
            <span className="product-price">{Math.round(product.cheapestPrice.amount)} {product.cheapestPrice.currency === "SEK" ? "kr" : product.cheapestPrice.currency}</span>
            <span><span role="img" aria-label="star">⭐</span>{product.rating.averageRating}</span>
          </div>
          </a>
    )
  }
}

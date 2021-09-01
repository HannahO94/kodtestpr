import React, { Component } from 'react';
import { getCategoryList } from './state/category';
import './Category.scss';
import Product from './Product';

export default class Category extends Component {
 
  constructor (props){
    super(props);
    this.state = { 
      products: [],
      categories: {}, 
      shortProducts: [], 
      hidden: false, 
      selectedFilter: null,
    };
  }
  
  componentDidMount() {
    const loadedData = getCategoryList();
    this.setState({categories: loadedData.category, products: loadedData.products, shortProducts: loadedData.products.slice(0,8)}); 
  }

  showMoreProducts(){
    const newLength = this.state.shortProducts.length + 8
    const products = this.state.products
    this.setState({shortProducts: products.slice(0, newLength)})
    if(newLength >= products.length){
      
      this.setState({hidden: true})
    }
  }

  sortProductList = (e) => {
    let productList = []
    productList = this.state.products
    if(e.target.id === "cheapestPrice"){
      productList.sort((a,b) => {
        return a.cheapestPrice.amount - b.cheapestPrice.amount;
      })
      this.setState({products : productList , shortProducts: productList.slice(0,8), selectedFilter: "cheapestPrice", hidden: false})
    }
    else if(e.target.id === "rating"){
      productList.sort((a,b) => {
        return a.rating.averageRating - b.rating.averageRating;
      })
      this.setState({ products : productList.reverse(), shortProducts: productList.reverse().slice(0,8), selectedFilter: "rating", hidden: false})
    }
    else if(e.target.id === "unset"){
      productList.sort((a,b) => {
        return a.rank - b.rank;
      })
      this.setState({products : productList , shortProducts: productList.slice(0,8), selectedFilter: "unset", hidden: false})
    }
    
  }
  

  render() {  
    return (
      <div className="page-wapper">
        <div className="hello-world">
          <h1 className="category-title">{this.state.categories.name}</h1>
          <ul className="filter-list">   
            <li><button id="cheapestPrice" className="filter-button" style={{borderBottom : this.state.selectedFilter === "cheapestPrice" ? "1px solid #53575e" : "none" }} onClick={(e) => this.sortProductList(e)}>Lägsta Pris</button></li>
            <li><button id="rating" className="filter-button" style={{borderBottom : this.state.selectedFilter === "rating" ? "1px solid #53575e" : "none" }} onClick={(e) => this.sortProductList(e)}>Bäst Betyg</button></li>
            <li><button id="unset" className="filter-button" style={{borderBottom : this.state.selectedFilter === "unset" ? "none" : "none" }} onClick={(e) => this.sortProductList(e)}>Inget filter</button></li>
          </ul>
        </div>
        <div className="list-container">
          <div className="product-list"> 
            {this.state.shortProducts.map((product) => {
              return (
              <Product key={product.id} product={product}/>
              )
              })}
        </div>
       </div>
       <button hidden={this.state.hidden} className="show-more" onClick={this.showMoreProducts.bind(this)}> + Visa fler</button>
      </div>
    );
  }
}

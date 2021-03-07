import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

import {addToCart} from '../store/cart'

import {Link} from 'react-router-dom'


export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    // if user is logged in
    if (this.props.user.id) {
      this.props.addToCart({
        userId: this.props.user.id,
        productId: this.props.singleProduct.id,
        quantity: this.state.quantity
      })
    }
  }
  handleChange(evt) {
    evt.persist()
    this.setState(state => ({
      ...state,
      [evt.target.name]: +evt.target.value
    }))
    console.log(this.state)
  }
  render() {
    const product = this.props.singleProduct

    if (product) {
      return (
        <section className="section product-view">
          {this.props.isAdmin === 'true' ? (
            <Link to={`/products/${product.id}/edit`}> Edit Product</Link>
          ) : (
            ''
          )}

          <figure>
            <img src={product.imageUrl} />
          </figure>
          <div className="product-info">
            <div className="product-name">{product.name}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price"> {product.price / 100} </div>
            <div className="product-quantity">{product.quantity}</div>
          </div>
           <form id="single-product-form" onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              type="number"
              min="1"
              max={product.quantity}
            />
            <button type="submit" onSubmit={this.handleSubmit}>
              Add to cart!
            </button>
          </form>
        </section>

      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProductReducer,
    user: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: product => dispatch(addToCart(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

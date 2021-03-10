import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

import {addToCart, setGuestCart} from '../store/cart'

import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1, checkedOut: false}
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
    } else {
      this.props.setGuestCart({
        id: this.props.singleProduct.id,
        imageUrl: this.props.singleProduct.imageUrl,
        name: this.props.singleProduct.name,
        price: this.props.singleProduct.price,
        quantity: this.state.quantity,
        quantityInDB: this.props.singleProduct.quantity
      })
    }
    this.setState(state => ({
      ...state,
      checkedOut: true
    }))
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
    const {quantity, checkedOut} = this.state
    if (product) {
      return (
        <section className="section product-view">
          {this.props.isAdmin === 'true' ? (
            <div className="edit-product">
              <Link
                to={`/products/${product.id}/edit`}
                className="button is-warning"
              >
                {' '}
                Edit Product
              </Link>
              <br />
            </div>
          ) : (
            ''
          )}

          <div className="product-info">
            <div>
              <div className="product-name title">{product.name}</div>
              <figure>
                <img src={product.imageUrl} />
              </figure>
            </div>
            <div>
              <div className="product-description">
                <span>
                  <strong>Description: </strong>
                </span>
                <p>{product.description}</p>
              </div>
              <div className="product-price">
                <span>
                  <strong>Price: </strong>$
                </span>
                <span>{product.price / 100}</span>
              </div>
              <div className="product-quantity">
                <span>
                  <strong>Quantity in stock: </strong>
                </span>
                <span>{product.quantity}</span>
              </div>
            </div>
          </div>
          <form id="single-product-form" onSubmit={this.handleSubmit}>
            <span>
              <label htmlFor="quantity" className="subtitle">
                {!checkedOut ? (
                  quantity > 1 ? (
                    'You party animal'
                  ) : (
                    'Quantity'
                  )
                ) : (
                  <span className="tag is-success">added to cart!</span>
                )}
              </label>
              <div className="control">
                <div className="select">
                  <select
                    name="quantity"
                    value={quantity}
                    onChange={this.handleChange}
                    min="1"
                    max={product.quantity}
                  >
                    {Array.from({length: product.quantity}).map((q, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {+(idx + 1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="control">
                <button
                  type="submit"
                  onSubmit={this.handleSubmit}
                  className="button is-primary"
                >
                  Add to cart!
                </button>
              </p>
            </span>
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

    addToCart: product => dispatch(addToCart(product)),
    setGuestCart: product => dispatch(setGuestCart(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

/* eslint-disable no-alert */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  fetchCart,
  completeOrder,
  updateCart,
  removeFromCart,
  transitionCart,
  guestStorage
} from '../store/cart'
import {fetchSingleProduct} from '../store/singleProduct'

import OrderHistory from './OrderHistory'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: {}, order: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    // if there are any items in localStorage to add to cart
    if (guestStorage.guestCart) {
      await this.props.transitionCart(this.props.loggedInUserId)
    }
    // need this so product from Products model gets attached to order
    await this.props.fetchCart(this.props.loggedInUserId)

    console.log(
      'this.props.cart after fetch cart-------------------------',
      this.props.cart
    )
    this.setState(state => ({
      ...state,
      user: this.props.user,
      order: this.props.cart
    }))
  }
  componentDidUpdate() {
    let cart = this.props.cart
    let order = this.state.order
    if (cart.length > 0 && order.length > 0) {
      for (let item of cart) {
        let orderItem = order.filter(i => i.productId === item.productId)[0]
        if (
          orderItem &&
          orderItem.quantity &&
          orderItem.quantity !== item.quantity
        ) {
          this.setState(state => ({
            ...state,
            order: cart
          }))
        }
      }
    }
  }
  componentWillUnmount() {
    if (this.state.order.length !== 0) {
      this.props.updateCart(this.state)
    }
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    let submit = true
    /* prevent ordersubmit thunk from firing if item stock in inventory is < stock in cart*/
    const {order} = this.state
    for (let item of order) {
      await this.props.fetchSingleProduct(item.productId)
      let productInDB = this.props.singleProduct
      if (item.quantity > productInDB.quantity) {
        submit = false
        window.alert(
          `${productInDB.quantity} bottles of ${productInDB.name} left in stock`
        )
      }
    }
    if (submit) {
      await this.props.completeOrder(this.state)
      this.setState(state => ({
        ...state,
        order: []
      }))
    }
  }
  handleChange(evt, productId) {
    evt.persist()
    this.setState(state => ({
      ...state,
      order: state.order.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: +evt.target.value
          }
        } else {
          return item
        }
      })
    }))
  }
  render() {
    console.log('CART IS RENDERING', this.props.cart)
    console.log('local state', this.state.order)
    const {products} = this.props
    const emptyCart = <div>{this.props.user.firstName}'s cart is empty</div>
    return this.state.order.length === 0 ? (
      <div>
        {emptyCart}
        <hr />
        <div>Order History</div>
        <OrderHistory />
      </div>
    ) : (
      <div>
        <form id="cart-form" onSubmit={this.handleSubmit}>
          {this.props.cart.map((item, idx) => (
            <div key={item.productId}>
              <div>Name: {item.product.name}</div>
              <label htmlFor={`cart-item-${item.productId}`}>
                Quantity{' '}
                <b>
                  {item.quantity >
                  products.filter(product => product.id === item.productId)[0]
                    .quantity
                    ? `THERE ARE ${
                        products.filter(
                          product => product.id === item.productId
                        )[0].quantity
                      } LEFT IN STOCK`
                    : ''}
                </b>
              </label>
              <input
                name={`cart-item-${item.productId}`}
                value={
                  this.state.order[idx]
                    ? this.state.order[idx].quantity
                    : item.quantity
                }
                type="number"
                min="0"
                max={item.product.quantity}
                required="required"
                onChange={evt => this.handleChange(evt, item.productId)}
              />
              <div>Price: ${item.price / 100}</div>
              <button
                type="button"
                onClick={() =>
                  this.props.removeFromCart({
                    userId: this.props.user.id,
                    orderId: item.orderId,
                    productId: item.productId
                  })
                }
              >
                X
              </button>
            </div>
          ))}
          {this.props.cart.length > 0 ? (
            <button
              type="submit"
              disabled={this.props.cart.length >= 1 ? '' : 'disabled'}
              onSubmit={this.handleSubmit}
            >
              Send me my Wine!
            </button>
          ) : (
            emptyCart
          )}
        </form>
        <hr />
        <div>Order History</div>
        <OrderHistory />
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart,
    user: state.user,
    products: state.products,
    singleProduct: state.singleProductReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    completeOrder: cartdetails => dispatch(completeOrder(cartdetails)),
    updateCart: cartdetails => dispatch(updateCart(cartdetails)),
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    removeFromCart: cartDetails => dispatch(removeFromCart(cartDetails)),
    transitionCart: userId => dispatch(transitionCart(userId))
  }
}
export default withRouter(connect(mapState, mapDispatch)(Cart))

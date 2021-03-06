import React from 'react'
import {fetchCart, completeOrder} from '../store/cart'
import {connect} from 'react-redux'

// to add X icon to delete item from cart
// to use a form to let user change quantity in cart -> send to back end on order submission

/* On Order submit
Put request to edit Product model with decremented quantity
    on front end all products and/or single product -> if quantity is 0, indicate to user

Put route to Order model to change isComplete from 'false' to 'true'
 => essentially add to user's history => Post request to add to users history


*/
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: {}, order: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchCart(this.props.loggedInUserId)
    console.log('cart --------------------', this.props.cart)
    this.setState(state => ({
      ...state,
      user: this.props.user,
      order: this.props.cart
    }))
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    console.log('this.state from Cart.js ------------------', this.state)
    await this.props.completeOrder(this.state)
    this.setState(state => ({
      ...state,
      order: []
    }))
  }
  handleChange(evt, productId) {
    evt.persist()
    console.log('evt------------------------------', evt)
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
    const emptyCart = <div>{this.props.user.firstName}'s cart is empty</div>
    return this.state.order.length === 0 ? (
      emptyCart
    ) : (
      <form id="cart-form" onSubmit={this.handleSubmit}>
        {this.state.order.map((item, idx) => (
          <div key={item.productId}>
            <div>Name: {item.product.name}</div>
            <label htmlFor={`cart-item-${item.productId}`}>Quantity</label>
            <input
              name={`cart-item-${item.productId}`}
              value={this.state.order[idx].quantity}
              type="number"
              min="1"
              max={item.product.quantity}
              onChange={evt => this.handleChange(evt, item.productId)}
            />
            <div>Price: ${item.price / 100}</div>
          </div>
        ))}
        <button type="submit" onSubmit={this.handleSubmit}>
          Send me my Wine!
        </button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    completeOrder: order => dispatch(completeOrder(order))
  }
}
export default connect(mapState, mapDispatch)(Cart)

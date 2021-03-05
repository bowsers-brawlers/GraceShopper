import React from 'react'
import {fetchCart} from '../store/cart'
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
  componentDidMount() {
    this.props.fetchCart(this.props.loggedInUserId)
  }
  render() {
    const emptyCart = <div>{this.props.user.firstName}'s cart is empty</div>
    return this.props.cart.length === 0
      ? emptyCart
      : this.props.cart.map(item => (
          <div key={item.productId}>
            <div>Name: {item.product.name}</div>
            <div>Quanitity: {item.quantity}</div>
            <div>Price: ${item.price / 100}</div>
          </div>
        ))
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
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}
export default connect(mapState, mapDispatch)(Cart)

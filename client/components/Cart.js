import React from 'react'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.loggedInUserId)
  }
  render() {
    const emptyCart = <div>You're cart is empty</div>
    return this.props.cart.length === 0
      ? emptyCart
      : this.props.cart.map(item => (
          <div key={item.productId}>
            {item.name} {item.quantity}
          </div>
        ))
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}
export default connect(mapState, mapDispatch)(Cart)

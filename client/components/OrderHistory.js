import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/cart'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrderHistory(this.props.user.id)
  }
  render() {
    if (this.props.orderHistory.length > 0) {
      return (
        <div>
          {this.props.orderHistory.map(order => {
            return (
              <div key={+(String(order.orderId) + String(order.productId))}>
                <ul>
                  Order ID: {order.orderId} on {order.createdAt}
                </ul>
                <li>
                  <Link to={`/products/${order.productId}`}>
                    {order.product.name}
                  </Link>
                </li>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>{this.props.user.firstName} has not purchase any wine yet :(</div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    orderHistory: state.cart.orderHistory,
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(OrderHistory))

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  fetchGuestCart,
  completeGuestOrder,
  guestStorage,
  removeFromGuestCart,
  setGuestCart
} from '../store/cart'
import {fetchSingleProduct} from '../store/singleProduct'

class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    let initialState = {order: []}
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // console.dir(JSON.parse(guestStorage.guestCart))

    if (guestStorage.guestCart) {
      console.log(JSON.parse(guestStorage.guestCart), 'THIS IS THE GUEST CART')
      this.props.fetchGuestCart(JSON.parse(guestStorage.guestCart))

      this.setState(state => ({
        ...state,

        order: JSON.parse(guestStorage.guestCart)
      }))
    }
  }
  componentWillUnmount() {
    if (this.state.order.length !== 0) {
      // this.props.setGuestCart(...this.state.order)
      // this.props.setGuestCart(...this.state.order)
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let submit = true
    /* prevent ordersubmit thunk from firing if item stock in inventory is < stock in cart*/
    const {order} = this.state
    for (let item of order) {
      await this.props.fetchSingleProduct(item.id)
      let productInDB = this.props.singleProduct
      if (item.quantity > productInDB.quantity) {
        submit = false
        window.alert(
          `${productInDB.quantity} bottles of ${productInDB.name} left in stock`
        )
      }
    }
    if (submit) {
      await this.props.completeGuestOrder()
      this.setState(state => ({
        ...state,
        order: []
      }))
    }
  }
  handleChange(evt, productId) {
    guestStorage.setItem('guestCart', JSON.stringify(this.state.order))
    evt.persist()
    console.log(+evt.target.value, 'EVT')
    console.log(productId, 'PRODUCTIDA')
    this.setState(
      state => ({
        ...state,
        order: state.order.map(item => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: +evt.target.value
            }
          } else {
            return item
          }
        })
      }),
      () => guestStorage.setItem('guestCart', JSON.stringify(this.state.order))
    )
  }
  render() {
    const {products} = this.props
    console.log('Guestcart is rerendering ====================================')
    console.log(products, 'THIS IS PRODUCTS')
    console.log(this.state, 'THIS IS STATTE')
    console.log(this.props, 'THIS IS PROPS')
    // console.log(JSON.parse(guestStorage.guestCart), 'THIS IS LOCALSTORAGE')

    const emptyCart = <div>The guest cart is empty</div>
    return this.props.cart.length === 0 ||
      this.props.products.length === 0 ||
      this.state.order.length === 0 ? (
      emptyCart
    ) : (
      <form id="cart-form" onSubmit={this.handleSubmit}>
        {this.props.cart.map((item, idx) => (
          <div key={item.id}>
            <div>Name: {item.name}</div>
            <label htmlFor={`cart-item-${item.id}`}>
              Quantity{' '}
              <b>
                {item.quantity >
                products.filter(product => product.id === item.id)[0].quantity
                  ? `THERE ARE ${item.quantityInDB} LEFT IN STOCK`
                  : ''}
              </b>
            </label>
            <input
              name={`cart-item-${item.id}`}
              value={this.state.order[idx].quantity}
              type="number"
              min="0"
              max={item.quantityInDB}
              required="required"
              onChange={evt => this.handleChange(evt, item.id)}
            />
            <div>Price: ${item.price / 100}</div>
            <button
              type="button"
              onClick={() => {
                this.props.removeFromGuestCart(item.id)
                this.setState(state => ({
                  ...state,
                  order: JSON.parse(guestStorage.guestCart)
                }))
              }}
            >
              X
            </button>
          </div>
        ))}
        {/* {this.props.cart.length > 0 ? (
          <button
            type="submit"
            disabled={this.props.cart.length < 1 ? 'disabled' : ''}
            onSubmit={this.handleSubmit}
          >
            Send me my Wine!
          </button>
        ) : (
          emptyCart
        )} */}
      </form>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart.cart,

    products: state.products,
    singleProduct: state.singleProductReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGuestCart: cart => dispatch(fetchGuestCart(cart)),
    completeGuestOrder: () => dispatch(completeGuestOrder()),
    removeFromGuestCart: productId => dispatch(removeFromGuestCart(productId)),
    setGuestCart: product => dispatch(setGuestCart(product)),

    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}
export default withRouter(connect(mapState, mapDispatch)(GuestCart))

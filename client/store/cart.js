import axios from 'axios'

// action type
const SET_CART = 'SET_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// action creator
const _addToCart = productsInOrder => {
  return {
    type: SET_CART,
    productsInOrder
  }
}
const _completeOrder = () => {
  return {
    type: COMPLETE_ORDER
  }
}
const _removeFromCart = productId => {
  return {
    type: REMOVE_FROM_CART,
    productId
  }
}
// thunk
// *********** object passed into thunk needs: userId, productId, quantity ***********
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const cart = (await axios.get(`/api/users/${userId}/orders`)).data
      dispatch(_addToCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}
export const addToCart = product => {
  return async dispatch => {
    try {
      const {userId} = product
      const body = {
        id: product.productId,
        quantity: product.quantity
      }
      await axios.post(`/api/users/${userId}/orders`, body)
      dispatch(fetchCart(userId))
    } catch (error) {
      console.log(error)
    }
  }
}
export const completeOrder = cartDetails => {
  const userId = cartDetails.user.id
  const orderId = cartDetails.order[0].orderId

  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}/orders/${orderId}`, cartDetails)
      dispatch(_completeOrder())
    } catch (error) {
      console.log(error)
    }
  }
}
export const updateCart = cartDetails => {
  const userId = cartDetails.user.id
  const orderId = cartDetails.order[0].orderId
  return async dispatch => {
    try {
      await axios.put(
        `/api/users/${userId}/orders/${orderId}/update`,
        cartDetails
      )
      dispatch(fetchCart(userId))
    } catch (error) {
      console.log(error)
    }
  }
}
export const removeFromCart = cartDetails => {
  const {userId, orderId, productId} = cartDetails
  return async dispatch => {
    try {
      await axios.delete(
        `/api/users/${userId}/order/${orderId}/products/${productId}`
      )
      dispatch(_removeFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}
// reducer
const initialState = {
  cart: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.productsInOrder}
    case COMPLETE_ORDER:
      return {...state, cart: []}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.productId)
      }
    default:
      return state
  }
}

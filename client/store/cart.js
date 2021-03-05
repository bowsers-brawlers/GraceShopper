import axios from 'axios'

// action type
const POPULATE_CART = 'POPULATE_CART'

// action creator
const _addToCart = productsInOrder => {
  return {
    type: POPULATE_CART,
    productsInOrder
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

// reducer
const initialState = {
  cart: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_CART:
      return {...state, cart: action.productsInOrder}
    default:
      return state
  }
}

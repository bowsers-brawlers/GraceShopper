import axios from 'axios'

// action type
const ADD_TO_CART = 'ADD_TO_CART'

// action creator
const _addToCart = productsInOrder => {
  return {
    type: ADD_TO_CART,
    productsInOrder
  }
}
// thunk
// *********** object passed into thunk needs: userId, productId, quantity ***********
export const addToCart = product => {
  return async dispatch => {
    try {
      const {userId} = product
      const body = {
        id: product.productId,
        quantity: product.quantity
      }
      const productsInOrder = (await axios.post(
        `/api/users/${userId}/orders`,
        body
      )).data
      dispatch(_addToCart(productsInOrder))
    } catch (error) {
      console.log(error)
    }
  }
}
// reducer
const initialState = {
  cart: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: action.productsInOrder}
    default:
      return state
  }
}

import axios from 'axios'


export const guestStorage = window.localStorage


// action type
const SET_CART = 'SET_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'


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

const _removeFromGuestCart = productId => {
  return {
    type: REMOVE_FROM_GUEST_CART,
    productId
  }
}
// thunk

const getOrderHistory = data => {
  return {
    type: GET_ORDER_HISTORY,
    data
  }
}
// thunk
export const fetchOrderHistory = userId => {
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/users/${userId}/order-history`)).data
      dispatch(getOrderHistory(data))
    } catch (error) {
      console.log(error)
    }
  }
}

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


export const fetchGuestCart = cart => {
  return dispatch => {
    dispatch(_addToCart(cart))
  }
}

export const setGuestCart = product => {
  return dispatch => {
    // const body = {
    //   id: product.productId,
    //   quantity: product.quantity,
    // }

    if (guestStorage.guestCart) {
      let guestCart = JSON.parse(guestStorage.guestCart)
      if (guestCart.filter(wine => wine.id === product.id).length > 0) {
        console.log('item is in local storage change quantity')
        guestCart = guestCart.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: product.quantity}
          } else {
            return item
          }
        })
        guestStorage.setItem('guestCart', JSON.stringify(guestCart))
      } else {
        guestStorage.setItem(
          'guestCart',
          JSON.stringify([...guestCart, product])
        )
      }
    } else {
      guestStorage.setItem('guestCart', JSON.stringify([product]))
    }
    const guestCart = JSON.parse(guestStorage.guestCart)
    dispatch(fetchGuestCart(guestCart))
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


export const completeGuestOrder = () => {
  guestStorage.clear()
  return dispatch => dispatch(_completeOrder())
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

export const removeFromGuestCart = productId => {
  return dispatch => {
    dispatch(_removeFromGuestCart(productId))
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

  cart: [],
  orderHistory: []
}

export default (state = initialState, action) => {
  if (state.cart === undefined) {
    state = initialState
  }
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

    case REMOVE_FROM_GUEST_CART:
      if (guestStorage.guestCart) {
        const guestCart = JSON.parse(guestStorage.guestCart)

        guestStorage.guestCart = JSON.stringify(
          guestCart.filter(item => item.id !== action.productId)
        )
      }

      console.log(
        JSON.parse(guestStorage.guestCart),
        'THIS IS LOCAL STORAGE AT THE REDUCER'
      )
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId)
      }


    case GET_ORDER_HISTORY:
      return {...state, orderHistory: action.data}

    default:
      return state
  }
}

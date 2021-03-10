import axios from 'axios'

export const guestStorage = window.localStorage

// action type
const SET_CART = 'SET_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'
const TRANSITION_CART = 'TRANSITION_CART'

// action creator
const _addToCart = productsInOrder => {
  return {
    type: SET_CART,
    productsInOrder
  }
}
const _completeOrder = order => {
  return {
    type: COMPLETE_ORDER,
    order
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

const _transitionCart = () => {
  return {
    type: TRANSITION_CART
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
    if (guestStorage.guestCart) {
      let guestCart = JSON.parse(guestStorage.guestCart)
      if (guestCart.filter(wine => wine.id === product.id).length > 0) {
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

// if there is overlap between localStorage cart and DB user cart, quantity is overwritten with quantity from local storage
export const transitionCart = userId => {
  return async dispatch => {
    try {
      const lsCart = JSON.parse(guestStorage.guestCart)
      guestStorage.guestCart = []
      // get open order (or create new one if does not exist)
      if (lsCart.length > 0) {
        for (let item of lsCart) {
          const product = {
            userId: userId,
            productId: item.id,
            quantity: item.quantity
          }
          await dispatch(addToCart(product))
        }
      }

      dispatch(_transitionCart())
    } catch (error) {
      console.log(error)
    }
  }
}

export const completeGuestOrder = guestCart => {
  guestStorage.clear()
  return async dispatch => {
    try {
      const order = await (await axios.post(
        '/api/users/guest/orders',
        guestCart
      )).data

      dispatch(_completeOrder(order))
    } catch (err) {
      console.log(err)
    }
  }
}

export const completeOrder = cartDetails => {
  const userId = cartDetails.user.id
  const orderId = cartDetails.order[0].orderId

  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}/orders/${orderId}`, cartDetails)
      if (userId) await dispatch(fetchOrderHistory(userId))
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
  orderHistory: [],
  guestOrder: {}
}

export default (state = initialState, action) => {
  if (state.cart === undefined) {
    state = initialState
  }
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.productsInOrder}
    case COMPLETE_ORDER:
      if (action.order) {
        return {
          ...state,
          cart: [],
          guestOrder: action.order
        }
      } else {
        return {...state, cart: []}
      }
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

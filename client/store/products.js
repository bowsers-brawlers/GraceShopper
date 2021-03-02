import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const allProducts = []
/**
 * ACTION CREATORS
 */

export const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getAllProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

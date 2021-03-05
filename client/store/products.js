import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * ACTION CREATORS
 */

export const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const _createProduct = product => ({
  type: CREATE_PRODUCT,
  product
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

export const createProduct = (product, history) => {
  return async dispatch => {
    const create = (await axios.post('/api/products/', product)).data
    dispatch(_createProduct(create))
    history.push('/home')
  }
}

/**
 * INITIAL STATE
 */
const allProducts = []

/**
 * REDUCER
 */
export default function(state = allProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}

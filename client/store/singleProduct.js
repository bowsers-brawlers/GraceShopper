import axios from 'axios'
import {fetchAllProducts} from './products'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const fetchSingleProduct = id => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(product))
  } catch (err) {
    console.log(err)
  }
}

/** EDIT PRODUCT */
export const _editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})
export const editProduct = (singleProduct, history) => async dispatch => {
  try {
    const {data: product} = await axios.put(`/api/products/`, singleProduct)

    dispatch(_editProduct(product))
    history.push(`/products/${singleProduct.id}`)
  } catch (e) {
    console.log(e)
  }
}

/** DELETE PRODUCT */
export const _deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const deleteProduct = (id, history) => {
  return async dispatch => {
    const removeProduct = await axios.delete(`/api/products/${id}`)
    dispatch(_deleteProduct(removeProduct))
    dispatch(fetchAllProducts())
    history.push('/')
  }
}

const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    case DELETE_PRODUCT:
      return action.product
    default:
      return state
  }
}

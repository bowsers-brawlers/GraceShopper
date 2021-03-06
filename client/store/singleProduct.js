import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const fetchSingleProduct = id => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`)
    console.log('PRODUCT', product)
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
export const editProduct = product => async dispatch => {
  try {
    console.log(product)
    const {data: product} = await axios.put(`/api/products/`)
  } catch (e) {
    next(e)
  }
}

const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

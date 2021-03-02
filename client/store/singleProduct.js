import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

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

const initialState = []

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

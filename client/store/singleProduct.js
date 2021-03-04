import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const _createProduct = product => ({
  type: CREATE_PRODUCT,
  product
})
export const createProduct = (product, history) => {
  return async dispatch => {
    const create = (await axios.post('/api/products/', product)).data
    dispatch(_createProduct(create))
    history.push('/home')
  }
}

export const fetchSingleProduct = id => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`)
    console.log('PRODUCT', product)
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
    case CREATE_PRODUCT:
      return action.product
    default:
      return state
  }
}

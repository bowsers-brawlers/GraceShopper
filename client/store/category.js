import axios from 'axios'

const FILTERED_PRODUCTS = 'FILTERED_PRODUCTS'

export const _filteredProducts = category => ({
  type: FILTERED_PRODUCTS,
  category
})

export const filteredProducts = slug => {
  return async dispatch => {
    try {
      const filter = (await axios.get('/api/' + slug)).data
      dispatch(_filteredProducts(filter))
    } catch (e) {
      console.log(e)
    }
  }
}

const filterProducts = []

/**
 * REDUCER
 */
export default function(state = filterProducts, action) {
  switch (action.type) {
    case FILTERED_PRODUCTS:
      return action.category
    default:
      return state
  }
}

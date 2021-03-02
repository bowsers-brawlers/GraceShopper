import axios from 'axios'

const GET_SINGLE_USER = 'GET_SINGLE_USER'

const getSingleUser = user => {
  return {
    type: GET_SINGLE_USER,
    user
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(getSingleUser(data))
  }
}

const initialState = {
  currentUser: {}
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    default:
      return state
  }
}

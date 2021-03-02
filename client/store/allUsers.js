import axios from 'axios'

// action types
const GET_ALL_USERS = 'GET_ALL_USERS'

// action creators
const getAllUsers = data => {
  return {
    type: GET_ALL_USERS,
    data
  }
}

// thunks
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const data = (await axios.get('/api/users')).data
      dispatch(getAllUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
const initialState = {
  allUsers: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, allUsers: action.data}
    default:
      return state
  }
}

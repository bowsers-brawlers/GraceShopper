import axios from 'axios'

const GET_SINGLE_USER = 'GET_SINGLE_USER'
const EDIT_SINGLE_USER = 'EDIT_SINGLE_USER'

const getSingleUser = user => {
  return {
    type: GET_SINGLE_USER,
    user
  }
}
const editSingleUser = info => {
  return {
    type: EDIT_SINGLE_USER,
    info
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(getSingleUser(data))
  }
}

export const editUser = info => async dispatch => {
  try {
    const {data} = await axios.put(`/auth/${info.id}`, info)
    dispatch(editSingleUser(data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  currentUser: {}
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return {...state, currentUser: action.user}
    case EDIT_SINGLE_USER:
      return {...state, currentUser: action.user}
    default:
      return state
  }
}

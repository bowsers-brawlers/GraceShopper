import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './singleProduct'
import singleUser from './singleUser'
import products from './products'
import allUsers from './allUsers'
import cart from './cart'

const reducer = combineReducers({
  user,
  products,
  allUsers,
  singleUser,
  singleProductReducer,
  cart
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

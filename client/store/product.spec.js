import {expect} from 'chai'
import {createStore, applyMiddleware} from 'redux'
import {getSingleProduct} from './singleProduct'
import singleProductReducer from './singleProduct'

const product = {
  id: 40,
  name: 'fakeName',
  description: 'fake description',
  price: 49.99,
  quantity: 400,
  imageUrl: 'wine.com'
}
describe('Action creator', () => {
  describe('getSingleProduct', () => {
    it('returns properly formatted action', () => {
      expect(getSingleProduct(product)).to.be.deep.equal({
        type: 'GET_SINGLE_PRODUCT',
        product: product
      })
    })
  })
})

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    // creates a store (for testing) using your (real) reducer
    const store = createStore(singleProductReducer, applyMiddleware())

    expect(store.getState()).to.be.an('array')
  })

  it("sets the action's product as the product on state (without mutating the previous state)", () => {
    const store = createStore(singleProductReducer, applyMiddleware())
    const prevState = store.getState()

    //const pet = getRandomPet(DOGS);
    const action = {type: 'GET_SINGLE_PRODUCT', product}
    store.dispatch(action)

    const newState = store.getState()

    expect(newState).to.be.deep.equal(product)
    expect(newState).to.not.be.equal(prevState)
  })
})

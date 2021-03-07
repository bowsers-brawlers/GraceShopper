import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../../store/products'

export class CreateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      quantity: '',
      imageUrl: '/images/default_product_wine.jpg'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const product = {}
    this.props.addProduct({...this.state})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {name, description, quantity, price, imageUrl} = this.state
    const {handleSubmit, handleChange} = this
    if (this.props.isAdmin === 'true') {
      return (
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="inputField">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={description}
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={price}
              placeholder="2000 = 20.00"
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              value={quantity}
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="imageUrl">Product Image</label>
            <input
              type="text"
              name="imageUrl"
              onChange={handleChange}
              value={imageUrl}
              placeholder="https:/images/default_product.png"
            />
          </div>
          <div className="buttons">
            <button type="submit">Add Product</button>
          </div>
        </form>
      )
    } else {
      return <div>Admin Only</div>
    }
  }
}

const mapDispatch = (dispatch, {history}) => ({
  addProduct: product => dispatch(createProduct(product, history))
})

export default connect(null, mapDispatch)(CreateProduct)

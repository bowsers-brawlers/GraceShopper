import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProduct, fetchSingleProduct} from '../../store/singleProduct'

export class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
      imageUrl: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
    if (id) {
      this.setState({
        id: this.props.product.id || '',
        name: this.props.product.name || '',
        description: this.props.product.description || '',
        price: this.props.product.price || '',
        quantity: this.props.product.quantity || '',
        imageUrl: this.props.product.imageUrl || ''
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.product.id && this.props.product.id) {
      this.setState({
        id: this.props.product.id,
        name: this.props.product.name,
        description: this.props.product.description,
        price: this.props.product.price,
        quantity: this.props.product.quantity,
        imageUrl: this.props.product.imageUrl
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const product = {}
    this.props.updateProduct({...this.state})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {name, description, quantity, price, imageUrl} = this.state
    const {handleSubmit, handleChange} = this
    if (this.props.user.isAdmin === 'true') {
      return (
        <section>
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
                placeholder="20"
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
              <button type="submit">Edit Product</button>
            </div>
          </form>
          <div className="btn-delete">
            <button>
              Delete:<small>notHooked</small>
            </button>
          </div>
        </section>
      )
    } else {
      return <div>Admin Only</div>
    }
  }
}

const mapState = state => ({
  user: state.user,
  product: state.singleProductReducer
})

const mapDispatch = (dispatch, {history}) => ({
  updateProduct: product => dispatch(editProduct(product, history)),
  getSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(EditProduct)

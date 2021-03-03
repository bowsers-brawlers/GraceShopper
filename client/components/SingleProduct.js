import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }
  render() {
    const product = this.props.singleProduct
    if (product) {
      return (
        <div>
          <h1>{product.name}</h1>
          <h3>{product.description}</h3>
          <h3> {product.price}</h3>
          <h3>{product.quantity}</h3>
          <img src={product.imageUrl} />
          <div>
            <button>BUY NOW</button>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}
const mapState = state => {
  return {
    singleProduct: state.singleProductReducer
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

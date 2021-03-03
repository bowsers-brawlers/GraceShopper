import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }
  render() {
    const product = this.props.singleProduct

    return (
      <div>
        {product.name}
        {product.description}
        {product.price}
        {product.quantity}
        <img src={product.imageUrl} />
      </div>
    )
  }
}
const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

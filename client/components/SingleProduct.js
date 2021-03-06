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
    console.log(this.props)
    if (product) {
      return (
        <section className="section product-view">
          <figure>
            <img src={product.imageUrl} />
          </figure>
          <div className="product-info">
            <div className="product-name">{product.name}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price"> {product.price}</div>
            <div className="product-quantity">{product.quantity}</div>
          </div>
          <div>
            <button>BUY NOW</button>
          </div>
        </section>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProductReducer,
    isAdmin: state.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

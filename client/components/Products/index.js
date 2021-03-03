import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export function AllProducts({products}) {
  if (products.length) {
    return products.map(product => (
      <section key={product.id}>
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <div>{product.quantity}</div>
        <div>
          <img src={product.imageUrl} alt={product.name} width="200px" />
        </div>
      </section>
    ))
  } else {
    return 'No Products'
  }
}
const mapState = state => ({products: state.products})

export default connect(mapState)(AllProducts)

AllProducts.prototype = {
  products: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string
  })
}

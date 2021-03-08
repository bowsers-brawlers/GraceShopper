import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export function AllProducts({products}) {
  if (products.length) {
    return products.map(product => (
      <section key={product.id} className="product-container">
        <Link to={`/products/${product.id}`}>
          <div className="product">
            <figure className="image is4by4">
              <img src={product.imageUrl} alt={product.name} width="200px" />
            </figure>
            <div className="title">{product.name}</div>
            <div className="product-price">${product.price / 100}</div>
          </div>
        </Link>
      </section>
    ))
  } else {
    return 'No Products'
  }
}

export function AllProductsContainer({products}) {
  return (
    <main className="content">
      <div className="all-products">
        <AllProducts products={products} />
      </div>
    </main>
  )
}

const mapState = state => ({products: state.products})

export default connect(mapState)(AllProductsContainer)

AllProducts.prototype = {
  products: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imageUrl: PropTypes.string
  })
}

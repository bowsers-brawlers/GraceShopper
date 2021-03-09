import React, {Component} from 'react'
import {connect} from 'react-redux'
import {filteredProducts} from '../../store/category'
import {Link} from 'react-router-dom'

export class FilterProductContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: this.props.match.params.categorySlug
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentSlug = this.props.match.params.categorySlug
    const prevSlug = prevProps.match.params.categorySlug
    if (currentSlug !== prevSlug) this.props.filter(currentSlug)
  }

  componentDidMount() {
    this.props.filter(this.state.slug)
  }

  render() {
    const {category} = this.props

    return (
      <section>
        <h1>{this.props.match.params.categorySlug.split('-').join(' ')}</h1>
        {category.map(product => (
          <section key={product.id} className="product-container">
            <Link to={`/products/${product.id}`}>
              <div className="product">
                <figure className="image is4by4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width="200px"
                  />
                </figure>
                <div className="title">{product.name}</div>
                <div className="product-price">${product.price / 100}</div>
              </div>
            </Link>
          </section>
        ))}
      </section>
    )
  }
}

const mapState = state => ({
  category: state.category
})
const mapDispatch = dispatch => ({
  filter: slug => dispatch(filteredProducts(slug))
})

export default connect(mapState, mapDispatch)(FilterProductContainer)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'

import AllUsers from './components/AllUsers'
import SingleUser from './components/SingleUser'
import EditUser from './components/EditUser'

import AllProducts from './components/Products'
import SingleProduct from './components/SingleProduct'
import FilterProduct from './components/Products/FilterProduct'
import CreateProduct from './components/Products/CreateProduct'
import EditProduct from './components/Products/EditProduct'

import GuestCart from './components/GuestCart'
import Cart from './components/Cart'

import {fetchAllProducts, filteredProducts} from './store/products'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, loggedInUserId, isAdmin} = this.props
    return (
      <>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* <Route
          path="/"
          render={() => <AllProducts products={this.props.products} />}
        /> */}

          <Route path="/guest-cart" component={GuestCart} />

          {/** EDIT PRODUCT **/}
          <Route
            exact
            path="/products/:productId/edit"
            component={EditProduct}
          />
          <Route
            path="/products/:productId"
            render={routeProps => (
              <SingleProduct {...routeProps} isAdmin={isAdmin} />
            )}
          />
          <Route
            exact
            path="/category/:categorySlug"
            render={routeProps => <FilterProduct {...routeProps} />}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route
                path="/cart"
                render={routeProps => (
                  <Cart {...routeProps} loggedInUserId={loggedInUserId} />
                )}
              />
              <Route
                path="/all-users/:userId"
                component={SingleUser}
                // render={routeProps => <SingleUser {...routeProps} />}
              />
              <Route
                path="/edit"
                render={routeProps => (
                  <EditUser {...routeProps} loggedInUserId={loggedInUserId} />
                )}
              />
              <Route
                path="/all-users"
                render={routeProps => (
                  <AllUsers {...routeProps} loggedInUserId={loggedInUserId} />
                )}
              />
              <Route
                path="/create-product"
                render={routeProps => (
                  <CreateProduct {...routeProps} isAdmin={isAdmin} />
                )}
              />
              <Route
                path="/"
                render={() => <AllProducts products={this.props.products} />}
              />
            </Switch>
          )}

          <Route
            path="/"
            render={() => <AllProducts products={this.props.products} />}
          />

          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    loggedInUserId: state.user.id,
    isAdmin: state.user.isAdmin,
    products: state.products,
    category: state.category
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchAllProducts())
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.string,
  products: PropTypes.array
}

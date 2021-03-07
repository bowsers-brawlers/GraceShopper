import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/singleUser'

class SingleUser extends React.Component {
  componentDidMount() {
    // console.log(this.props)
    // console.log('single user mounted')
    try {
      const userId = this.props.match.params.userId
      this.props.loadSingleUser(userId)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    console.log('props--------', this.props)

    return (
      <div>
        <div>{this.props.currentUser.firstName}</div>
        <div>{this.props.currentUser.lastName}</div>
        <div>{this.props.currentUser.email}</div>
        <div>{this.props.currentUser.imageUrl}+</div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id))
  }
}
const mapState = state => {
  return {
    currentUser: state.singleUser.currentUser
  }
}
export default connect(mapState, mapDispatch)(SingleUser)

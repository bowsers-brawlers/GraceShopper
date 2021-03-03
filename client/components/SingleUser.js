import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/singleUser'

class SingleUser extends React.Component {
  componenetDidMount() {
    try {
      const userId = this.props.match.params.userId
      this.props.loadSingleUser(userId)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <div>{this.props.state.currentUser.firstName}</div>
        <div>{this.props.state.currentUser.lastName}</div>
        <div>{this.props.state.currentUser.email}</div>
        <div>{this.props.state.currentUser.imageUrl}+</div>
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
    state: state.singleUser
  }
}
export default connect(mapState, mapDispatch)(SingleUser)

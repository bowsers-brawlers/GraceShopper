import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser, editUser} from '../store/singleUser'

export class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.loggedInUserId,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      this.props.loadSingleUser(this.props.loggedInUserId)
      if (this.props.loggedInUserId) {
        this.setState({
          id: this.props.loggedInUserId || '',
          firstName: this.props.currentUser.firstName || '',
          lastName: this.props.currentUser.lastName || '',
          email: this.props.currentUser.email || '',
          password: this.props.currentUser.password || ''
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate(prevProps) {
    //console.log('PREVPROPPPPPPSSSSSSS', prevProps)
    if (!prevProps.currentUser.id && this.props.currentUser.id) {
      console.log(this.props.currentUser.firstName)
      this.setState({
        id: this.props.currentUser.id,
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        email: this.props.currentUser.email,
        password: this.props.currentUser.password
      })
    }
    //console.log('-------------', this.props)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      id: this.props.loggedInUserId
    })
    const pass = document.getElementById('password').value
    const passCheck = document.getElementById('password-check').value
    if (pass !== passCheck) {
      window.alert('PASSWORDS DO NOT MATCH!!!!!!!!!!!')
    } else {
      this.props.editUser({...this.state})
      window.alert('Your Info Has Been Changed!')
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {firstName, lastName, email} = this.state
    return (
      <div>
        <form id="product-form" onSubmit={this.handleSubmit}>
          <div className="inputField">
            <label htmlFor="First Name">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={firstName}
              placeholder="John"
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="Last Name">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={lastName}
              placeholder="Doe"
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={email}
              placeholder="John@doe.com"
              required
            />
          </div>
          <br />

          <div className="inputField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="inputField">
            <label htmlFor="password-check">Re-Type Password</label>
            <input
              id="password-check"
              type="password"
              name="password-check"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="buttons">
            <button type="submit">Submit Changes</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id)),
    editUser: info => dispatch(editUser(info))
  }
}
const mapState = state => {
  return {
    currentUser: state.singleUser.currentUser
  }
}
export default connect(mapState, mapDispatch)(EditUser)

/* 
FORM
____

[X]GET ID
[x]ADD FORM WITH USERS DATA PRE-LOADED
[]ON SUBMIT TO REDUX STORE
*/

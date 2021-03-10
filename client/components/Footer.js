import React from 'react'

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>Wine &copy; {new Date().getFullYear()}</p>
      </footer>
    )
  }
}

export default Footer

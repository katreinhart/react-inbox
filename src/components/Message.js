import React, { Component } from 'react'

class Message extends Component {
  constructor() {
    super()
    this.state = {
      checked: false,
    }
  }

  handleCheck = () => {
    let prevState = this.state
    this.setState({
      prevState,
      checked: !prevState.checked
    })
  }

  render() {
    return (
      <div className={ "row message " + ( this.props.message.read ? 'read' : 'unread' ) + ( this.state.checked ? 'selected' : '') }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ this.state.checked } onChange={ this.handleCheck }/>
            </div>
            <div className="col-xs-2">
              <i className="star fa fa-star-o"></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            { this.props.message.subject }
          </a>
        </div>
      </div>
    )
  }
} 

export default Message
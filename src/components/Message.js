import React, { Component } from 'react'

class Message extends Component {
  displayBadge() {
    return this.props.message.labels.map(label => {
      return <span className="label label-warning" key={ label }>{ label }</span>
    })
  }

  render() {
    return (
      <div className={ "row message " + ( this.props.message.read ? 'read' : 'unread' ) + ( this.props.message.selected ? ' selected' : '') }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ this.props.message.selected } onClick={ this.props.onCheck } id={ 'check-'+(this.props.message.id) }/>
            </div>
            <div className="col-xs-2">
              <i className={ "star fa " + ( this.props.message.starred ? 'fa-star' : 'fa-star-o' ) } onClick={ this.props.onStar } id={ 'star-'+(this.props.message.id) }></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            { this.displayBadge() } { this.props.message.subject }
          </a>
        </div>
      </div>
    )
  }
} 

export default Message
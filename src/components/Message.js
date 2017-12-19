import React from 'react'

const Message = ({ selected, starred, onCheck, onStar, message, onAddLabel, onRemoveLabel }) => {

  const displayBadge = (message) => {
    return message.labels.map(label => {
      return <span className="label label-warning" key={ label }>{ label }</span>
    })
  }

  return (
  <div className={ "row message " + ( message.read ? 'read' : 'unread' ) + ( message.selected ? ' selected' : '') }>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" checked={ message.selected } onClick={ onCheck } id={ 'check-'+(message.id) }/>
        </div>
        <div className="col-xs-2">
          <i className={ "star fa " + ( message.starred ? 'fa-star' : 'fa-star-o' ) } onClick={ onStar } id={ 'star-'+(message.id) }></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="">
        { displayBadge(message) } { message.subject }
      </a>
    </div>
  </div>
)}
 
export default Message
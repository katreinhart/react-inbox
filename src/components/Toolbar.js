import React, { Component } from 'react'
import pluralize from 'pluralize'

const Toolbar = ({ 
  messages,
  onSelectAll,
  onMarkRead,
  onMarkUnread,
  onDelete,
  onAddLabel,
  onRemoveLabel,
  onCompose 
}) => {
  
  const countUnread = () => messages
    .filter(message=> message.read === false)
    .length

  const allAreChecked = () => messages
    .every(message => message.selected === true)

  const someAreChecked = () => messages
    .some(message => message.selected === true)

  const noneAreChecked = () => !someAreChecked()
  return (
    <div className="container">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ countUnread() }</span>
            unread { pluralize('message', countUnread()) }
          </p>

          <button className="btn btn-danger" onClick={ onCompose }>
            <i className="fa fa-plus"></i>
          </button>
  
          <button onClick={ onSelectAll } >
            <i className={ "fa " + ( allAreChecked() ? 'fa-check-square-o' : ( someAreChecked() ? 'fa-minus-square-o' : 'fa-square-o' )) }></i>
          </button>
  
          <button 
            className={ "btn btn-default" + ( noneAreChecked() ? ' disabled' : '' ) } 
            onClick={ onMarkRead }
          >
            Mark As Read
          </button>
  
          <button 
            className={ "btn btn-default" + ( noneAreChecked() ? ' disabled' : '' ) } 
            onClick={ onMarkUnread }
          >
            Mark As Unread
          </button>
  
          <select 
            className="form-control label-select" 
            disabled={ noneAreChecked() }
            onChange={ onAddLabel }
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
  
          <select 
            className="form-control label-select" 
            disabled={ noneAreChecked() }
            onChange={ onRemoveLabel }
          >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
  
          <button 
            className={ "btn btn-default" + ( noneAreChecked() ? ' disabled' : '' ) } 
            onClick={ onDelete }
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
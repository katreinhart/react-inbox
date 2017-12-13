import React, { Component } from 'react'
import pluralize from 'pluralize'

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  countUnread = () => this.props.messages
    .filter(message=> message.read === false)
    .length

  allAreChecked = () => this.props.messages
    .every(message => message.selected === true)

  someAreChecked = () => this.props.messages
    .some(message => message.selected === true)

  noneAreChecked = () => !this.someAreChecked()

  render() {
    return (
      <div className="container">
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{ this.countUnread() }</span>
              unread { pluralize('message', this.countUnread()) }
            </p>

            <button className="btn btn-danger" onClick={ this.props.onCompose }>
              <i className="fa fa-plus"></i>
            </button>
    
            <button onClick={ this.props.onSelectAll } >
              <i className={ "fa " + ( this.allAreChecked() ? 'fa-check-square-o' : ( this.someAreChecked() ? 'fa-minus-square-o' : 'fa-square-o' )) }></i>
            </button>
    
            <button 
              className={ "btn btn-default" + ( this.noneAreChecked() ? ' disabled' : '' ) } 
              onClick={ this.props.onMarkRead }
            >
              Mark As Read
            </button>
    
            <button 
              className={ "btn btn-default" + ( this.noneAreChecked() ? ' disabled' : '' ) } 
              onClick={ this.props.onMarkUnread }
            >
              Mark As Unread
            </button>
    
            <select 
              className="form-control label-select" 
              disabled={ this.noneAreChecked() }
              onChange={ this.props.onAddLabel }
            >
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>
    
            <select 
              className="form-control label-select" 
              disabled={ this.noneAreChecked() }
              onChange={ this.props.onRemoveLabel }
            >
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>
    
            <button 
              className={ "btn btn-default" + ( this.noneAreChecked() ? ' disabled' : '' ) } 
              onClick={ this.props.onDelete }
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default Toolbar
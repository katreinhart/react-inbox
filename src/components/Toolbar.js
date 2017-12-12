import React, { Component } from 'react'

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

  noneAreChecked = () => this.props.messages
    .none(message => message.selected === true)

  render() {
    return (
      <div className="container">
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{ this.countUnread() }</span>
              unread messages
            </p>
    
            <button className="btn btn-default" onClick={ this.props.onSelectAll }>
              <i className={ "fa " + ( this.allAreChecked() ? 'fa-check-square-o' : ( this.someAreChecked() ? 'fa-minus-square-o' : 'fa-square-o' )) }></i>
            </button>
    
            <button className="btn btn-default" onClick={ this.props.onMarkRead }>
              Mark As Read
            </button>
    
            <button className="btn btn-default" onClick={ this.props.onMarkUnread }>
              Mark As Unread
            </button>
    
            <select className="form-control label-select" id='add-label'>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>
    
            <select className="form-control label-select" id='remove-label'>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>
    
            <button className="btn btn-default" onClick={ this.props.onDelete }>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default Toolbar
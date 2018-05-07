import React from 'react'
import ReactDOM from 'react-dom'

import { CSSTransitionGroup } from 'react-transition-group'

export default class ColumnToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHeaderDropdown: false
    }
  }

  activeItemClass(attr) {
    if (this.props.headers.filter(header => (header.sort == attr)).length > 0) {
      return 'react-table__dropdown-item'
    } else {
      return 'react-table__dropdown-item react-table__dropdown-item--inactive'
    }
  }

  renderHeaderDropdown() {
    if (this.state.showHeaderDropdown) {
      return(
        <ul className="react-table__dropdown">
          {this.props.allHeaders.map((header, index) => {
            return(
              <li key={index} className={this.activeItemClass(header.sort)} onClick={this.props.handleToggleColumns(header.sort)}>
                {header.display}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  activeClass() {
    if (this.state.showHeaderDropdown) {return 'react-table__option--active'} else {return ''}
  }

  handleDropdownVisibility() {
    this.setState({showHeaderDropdown: !this.state.showHeaderDropdown})
  }

  render() {
    return(
      <span
        className={"react-table__option " + this.activeClass()}
        onClick={this.handleDropdownVisibility.bind(this)}
      >
        Columns
        <CSSTransitionGroup
          transitionName="react-table__dropdown"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.renderHeaderDropdown()}
        </CSSTransitionGroup>
      </span>
    )
  }
}

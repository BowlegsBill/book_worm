import React from 'react'
import ReactDOM from 'react-dom'

import { CSSTransitionGroup } from 'react-transition-group'

export default class Row extends React.Component {
  renderData(column) {
    if (this.props.activeRows[this.props.index]) {
      return(
        <span>
          {this.props.activeRows[this.props.index][column.sort]}
        </span>
      )
    } else {
      return(
        <span style={{opacity: 0}}>.</span>
      )
    }
  }

  render() {
    let tableData = this.props.columns.map((column, index) => {
      return(
        <td
          key={index}
          onMouseEnter={this.props.handleMouseEnter}
          onMouseLeave={this.props.handleMouseLeave}
        >
          {this.renderData(column)}
        </td>
      )
    })
    return(
      <tr className="react-table__row">
        {tableData}
      </tr>
    )
  }
}

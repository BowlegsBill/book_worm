import React from 'react'
import ReactDOM from 'react-dom'

export default class Row extends React.Component {
  render() {
    let tableData = Object.keys(this.props.columns).map((column, index) => {
      return(
        <td key={index}
          onMouseEnter={this.props.handleMouseEnter}
          onMouseLeave={this.props.handleMouseLeave}
        >
          {this.props.row[column]}
        </td>
      )
    })
    return(
      <tr className='react-table__row'>
        {tableData}
      </tr>
    )
  }
}

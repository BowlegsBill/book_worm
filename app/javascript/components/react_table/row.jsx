import React from 'react'
import ReactDOM from 'react-dom'

export default class Row extends React.Component {
  renderTableData() {
    return(
      Object.keys(this.props.columns).map((column, index) => {
        return(
          <td key={index}
            onMouseEnter={this.props.handleMouseEnter}
            onMouseLeave={this.props.handleMouseLeave}
          >
            {this.props.row[column]}
          </td>
        )
      })
    )
  }

  render() {
    return(
      <tr>
        {this.renderTableData()}
      </tr>)
  }
}

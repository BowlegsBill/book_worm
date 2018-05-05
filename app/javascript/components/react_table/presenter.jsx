import React from 'react'
import ReactDOM from 'react-dom'

import Row from './row'

export default class Presenter extends React.Component {
  renderHeaders() {
    return(
      <thead>
        <tr>
          {Object.keys(this.props.headers).map((key, index) => {
            return(
              <th key={index} data-sort={key} onClick={this.props.handleSort}>
                <span>{this.props.headers[key]}</span>
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  renderData() {
    return(
      <tbody className="react-table__tbody">
        {this.props.rows.map((row, index) => {
          return(
            <Row
              key={index}
              row={row}
              handleMouseEnter={this.props.handleMouseEnter}
              handleMouseLeave={this.props.handleMouseLeave}
              columns={this.props.headers}
            />
          )
        })}
      </tbody>
    )
  }

  render() {
    let colgroups = Object.keys(this.props.headers).map(function(_, index) { return <colgroup key={index}></colgroup> })
    return(
      <div className="react-table">
        <div className="react-table__wrap">
          <table className="react-table__table">
            {colgroups}
            {this.renderHeaders()}
            {this.renderData()}
          </table>
        </div>
      </div>
    )
  }
}

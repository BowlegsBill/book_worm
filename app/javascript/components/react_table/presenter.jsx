import React from 'react'
import ReactDOM from 'react-dom'

import { CSSTransitionGroup } from 'react-transition-group'

import Options from './options'
import Row from './row'

export default class Presenter extends React.Component {
  headerWidth() {
    let width = (100 / (Object.keys(this.props.headers).length)) + '%'
    return {width: width}
  }

  renderHeaders() {
    return(
      <thead>
        <tr>
          {Object.keys(this.props.headers).map((key, index) => {
            return(
              <th
                key={index}
                data-sort={key}
                className="react-table__sort"
                onClick={this.props.handleSort}
                style={this.headerWidth()}>
                {this.props.headers[key]}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  renderData() {
    return(
      <CSSTransitionGroup
        component="tbody"
        className="react-table__tbody"
        transitionName="react-table__row"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
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
      </CSSTransitionGroup>
    )
  }

  render() {
    let colgroups = Object.keys(this.props.headers).map(function(_, index) { return <colgroup key={index}></colgroup> })
    return(
      <div className="react-table">
        <div className="react-table__wrap">
          <Options {...this.props} />
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

import React from 'react'
import ReactDOM from 'react-dom'

import Options from './options'
import Row from './row'
import Pagination from './pagination'

export default class Presenter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      handleMouseEnter: this.handleMouseEnter.bind(this),
      handleMouseLeave: this.handleMouseLeave.bind(this)
    }
  }

  handleMouseEnter(event) {
    let elm = event.currentTarget
    let parent = elm.parentNode
    let index = ([...parent.children].indexOf(elm))
    parent.classList.add('react-table--hover')
    document.getElementsByTagName('colgroup')[index].classList.add('react-table--hover')
  }

  handleMouseLeave(event) {
    let elm = event.currentTarget
    let parent = elm.parentNode
    let index = ([...parent.children].indexOf(elm))
    parent.classList.remove('react-table--hover')
    document.getElementsByTagName('colgroup')[index].classList.remove('react-table--hover')
  }

  headerWidth() {
    return {width: (100 / (this.props.headers.length)) + '%'}
  }

  renderHeaders() {
    return(
      <thead>
        <tr>
          {this.props.headers.map((header, index) => {
            return(
              <th
                key={index}
                data-sort={header.sort}
                className="react-table__sort"
                onClick={this.props.handleSort}
                style={this.headerWidth()}>
                {header.display}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  renderPagination() {
    return(
      <Pagination {...this.props} />
    )
  }

  renderData() {
    return(
      <tbody>
        {[...Array(this.props.resultsPerPage).keys()].map((_, index) => {
          return(
            <Row
              activeRows={this.props.activeRows}
              key={index}
              index={index}
              handleMouseEnter={this.state.handleMouseEnter}
              handleMouseLeave={this.state.handleMouseLeave}
              columns={this.props.headers}
            />
          )
        })}
      </tbody>
    )
  }

  render() {
    let colgroups = this.props.headers.map(function(_, index) { return <colgroup key={index}></colgroup> })
    return(
      <div className="react-table">
        <div className="react-table__wrap">
          <Options {...this.props} />
          <table className="react-table__table">
            {colgroups}
            {this.renderHeaders()}
            {this.renderData()}
          </table>
          {this.renderPagination()}
        </div>
      </div>
    )
  }
}

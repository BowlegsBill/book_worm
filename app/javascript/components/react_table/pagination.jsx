import React from 'react'
import ReactDOM from 'react-dom'

export default class Pagination extends React.Component {

  render() {
    return(
      <div className="react-table__pagination">
        <button
          className="react-table__pagination-button"
          onClick={this.props.changeActivePage(this.props.activePage - 1)}
          disabled={this.props.activePage == 1}>
          Previous
        </button>
        <span className="react-table__pagination-main">
          <span style={{marginRight: '5px'}}>Page</span>
          <input type="number" value={this.props.activePage} onChange={this.props.handleActivePageChange} />
          <span style={{marginLeft: '5px'}}>of {this.props.totalNumberOfRows}</span>
        </span>
        <button
          className="react-table__pagination-button"
          onClick={this.props.changeActivePage(this.props.activePage + 1)}
          disabled={Math.ceil(this.props.rows.length / this.props.resultsPerPage) == this.props.activePage}>
          Next
        </button>
      </div>
    )
  }
}

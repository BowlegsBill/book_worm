import React from 'react'
import ReactDOM from 'react-dom'

import ColumnToggle from './column_toggle'
import Search from './search'
import Export from './export'

export default class Options extends React.Component {

  render() {
    return(
      <div className="react-table__options">
        <ColumnToggle {...this.props} />
        <Search handleSearch={this.props.handleSearch} />
        <Export {...this.props} />
      </div>
    )
  }
}

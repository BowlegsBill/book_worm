import React from 'react'
import ReactDOM from 'react-dom'

import { CSSTransitionGroup } from 'react-transition-group'

import XlsExport from './xls-export'

export default class Export extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showExportDropdown: false,
      handleExport: this.handleExport.bind(this)
    }
  }

  handleDropdownVisibility() {
    this.setState({showExportDropdown: !this.state.showExportDropdown})
  }

  handleExport(event) {
    let type = event.currentTarget.getAttribute('data-type')
    const xls = new XlsExport(this.props.rows, this.props.title)
    if (type == 'Excel') {
      xls.exportToXLS(this.props.title + '.xls')
    } else if (type == 'CSV') {
      xls.exportToCSV()
    }
  }

  renderExportDropdown() {
    if (this.state.showExportDropdown) {
      return(
        <ul className="react-table__dropdown">
          {['Excel', 'CSV', 'PDF'].map((exportOption, index) => {
            return(
              <li key={index} className="react-table__dropdown-item" data-type={exportOption} onClick={this.state.handleExport}>
                {exportOption}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  activeClass() {
    if (this.state.showExportDropdown) {return 'react-table__option--active'} else {return ''}
  }

  render() {
    return(
      <span
        className={"react-table__option " + this.activeClass()}
        onClick={this.handleDropdownVisibility.bind(this)}>
        Export
        <CSSTransitionGroup
          transitionName="react-table__dropdown"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
         {this.renderExportDropdown()}
        </CSSTransitionGroup>
      </span>
    )
  }
}

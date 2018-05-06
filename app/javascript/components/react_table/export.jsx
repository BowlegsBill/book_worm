import React from 'react'
import ReactDOM from 'react-dom'

export default class Export extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showExportDropdown: false
    }
  }

  handleDropdownVisibility() {
    this.setState({showExportDropdown: !this.state.showExportDropdown})
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
      </span>
    )
  }
}

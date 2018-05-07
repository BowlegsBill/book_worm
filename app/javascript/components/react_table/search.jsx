import React from 'react'
import ReactDOM from 'react-dom'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false
    }
  }

  activeClass() {
    if (this.state.isFocused) {return 'react-table__option--active'} else {return ''}
  }

  render() {
    return(
      <span className={"react-table__option " + this.activeClass()}>
        <input
          className="react-table__option-input"
          type="text"
          placeholder="Type here to search..."
          onFocus={(e) => (this.setState({isFocused: true}))}
          onBlur={(e) => (this.setState({isFocused: false}))}
          onChange={this.props.handleSearch} />
      </span>
    )
  }
}

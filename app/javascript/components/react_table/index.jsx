import React from 'react'
import ReactDOM from 'react-dom'

import Presenter from './presenter'

export default class ReactTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: this.props.headers,
      allHeaders: this.props.headers,
      rows: this.props.rows,
      handleMouseEnter: this.handleMouseEnter.bind(this),
      handleMouseLeave: this.handleMouseLeave.bind(this),
      handleSort: this.handleSort.bind(this),
      handleToggleColumns: this.handleToggleColumns,
      handleSearch: this.handleSearch.bind(this)
    }
  }

  originalRows() {
    return this.props.rows
  }

  handleMouseEnter(event) {
    let elm = event.target
    let parent = elm.parentNode
    let index = ([...parent.children].indexOf(elm))
    parent.classList.add('react-table--hover')
    document.getElementsByTagName('colgroup')[index].classList.add('react-table--hover')
  }

  handleMouseLeave(event) {
    let elm = event.target
    let parent = elm.parentNode
    let index = ([...parent.children].indexOf(elm))
    parent.classList.remove('react-table--hover')
    document.getElementsByTagName('colgroup')[index].classList.remove('react-table--hover')
  }

  removeSortingClasses() {
    [].map.call(document.getElementsByTagName('th'), function(el) {
      el.classList.remove('react-table__sort-down');
      el.classList.remove('react-table__sort-up');
    })
  }

  sortRows() {
    if (!this.state.sortAttribute) { return }
    // The slice is needed to create a clone of the rows. Without the slice the sort directly changes
    // the rows which also modifies the originalRows array
    let sortedRows = this.state.rows.slice(0).sort((a, b) => a[this.state.sortAttribute].toString().localeCompare(b[this.state.sortAttribute].toString()));
    this.state.sortDirection == 'desc' ? sortedRows.reverse() : sortedRows
    this.setState({rows: sortedRows})
  }

  filterData(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].toString().toLowerCase().includes(searchKey)))
  }

  handleSearch(event) {
    this.setState({rows: this.filterData(this.originalRows(), event.target.value)}, () =>
      this.sortRows()
    )
  }

  handleSort(event) {
    // If the class is already sorted down switch to up
    if (event.currentTarget.classList.contains('react-table__sort-down')) {
      this.removeSortingClasses()
      event.currentTarget.classList.remove('react-table__sort-down');
      event.currentTarget.classList.add('react-table__sort-up');
      this.setState({sortDirection: 'asc', sortAttribute: event.currentTarget.getAttribute('data-sort')}, () =>
        this.sortRows()
      )
    // If class is up don't sort
    } else if (event.currentTarget.classList.contains('react-table__sort-up'))  {
      this.removeSortingClasses()
      this.setState({sortDirection: '', sortAttribute: ''}, () =>
        this.setState({rows: this.originalRows()})
      )
    } else {
      this.removeSortingClasses()
      event.currentTarget.classList.add('react-table__sort-down');
      this.setState({sortDirection: 'desc', sortAttribute: event.currentTarget.getAttribute('data-sort')}, () =>
        this.sortRows()
      )
    }
  }

  handleToggleColumns = (headerKey) => (e) => {
    // The parent of this element also has a click event, so we need to stop this event from
    // propagating (stops the dropdown being closed)
    e.stopPropagation()
    let selectedHeaders = this.state.headers
    if (selectedHeaders.hasOwnProperty(headerKey)) {
      delete selectedHeaders[headerKey]
    } else {
      selectedHeaders[headerKey] = this.state.allHeaders[headerKey]
    }
    this.setState({headers: selectedHeaders})
  }

  render() {
    return(
      <Presenter
        {...this.state}
      />
    )
  }
}

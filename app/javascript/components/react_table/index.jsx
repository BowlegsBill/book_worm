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
      title: this.props.title,
      totalNumberOfRows: this.props.rows.length,
      search: '',
      handleSort: this.handleSort.bind(this),
      handleToggleColumns: this.handleToggleColumns,
      changeActivePage: this.changeActivePage,
      handleActivePageChange: this.handleActivePageChange.bind(this),
      handleSearch: this.handleSearch.bind(this),
      resultsPerPage: 10,
      activePage: 1
    }
  }

  componentWillMount() {
    this.getActiveRows()
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.rows != this.state.rows) || prevState.activePage != this.state.activePage ) {
      this.getActiveRows()
    }
  }

  getActiveRows() {
    let start = (this.state.activePage - 1) * this.state.resultsPerPage
    let end = (this.state.activePage * this.state.resultsPerPage)
    this.setState({activeRows: this.state.rows.slice(start, end)})
  }

  originalRows() {
    return this.props.rows
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
    this.setState({search: event.target.value}, () =>
      this.setState({rows: this.filterData(this.originalRows(), this.state.search)}, () =>
        this.sortRows()
      )
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
        this.setState({rows: this.filterData(this.originalRows(), this.state.search)})
      )
    } else {
      this.removeSortingClasses()
      event.currentTarget.classList.add('react-table__sort-down');
      this.setState({sortDirection: 'desc', sortAttribute: event.currentTarget.getAttribute('data-sort')}, () =>
        this.sortRows()
      )
    }
  }

  handleActivePageChange (event) {
    let number = event.target.value
    if ((event.target.value * this.state.resultsPerPage) > this.state.rows.length) {
      number = Math.ceil(this.state.rows.length / this.state.resultsPerPage)
    } else if (event.target.value == 0) {
      number = 1
    }
    this.setState({activePage: number})
  }

  handleToggleColumns = (headerKey) => (e) => {
    // The parent of this element also has a click event, so we need to stop this event from
    // propagating (stops the dropdown being closed)
    e.stopPropagation()
    // Get the header from the array of all the headers
    let selectedHeader = this.state.allHeaders.filter(header => (header.sort == headerKey))[0]
    let selectedHeaders
    if (this.state.headers.indexOf(selectedHeader) >= 0) {
      // Return the array minus the element if it already exists in the active array
      selectedHeaders = this.state.headers.filter(header => (header.sort != headerKey))
    } else {
      // Add the header into the active array
      let oldHeaders = this.state.headers.slice(0)
      oldHeaders.splice(this.state.allHeaders.indexOf(selectedHeader), 0, selectedHeader)
      selectedHeaders = oldHeaders
    }
    this.setState({headers: selectedHeaders})
  }

  changeActivePage = (pageNumber) => (e) => {
    let number = pageNumber
    if ((pageNumber * this.state.resultsPerPage) > this.state.rows.length) {
      number = Math.ceil(this.state.rows.length / this.state.resultsPerPage)
    } else if (pageNumber == 0) {
      number = 1
    }
    this.setState({activePage: number})
  }

  render() {
    return(
      <Presenter
        {...this.state}
      />
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'

import Presenter from './presenter'

export default class ReactTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: { title: 'Title', author: 'Author', genre: 'Genre', year_published: 'Year published' },
      rows: [
        { title: 'Harry Potter', author: 'J. K. Rowling', genre: 'Fantasy', year_published: 1990 },
        { title: 'Lord of the rings', author: 'J.R.R Tolkien', genre: 'Fantasy', year_published: 1950 },
        { title: 'Eloquent Ruby', author: 'Some guy', genre: 'Learning', year_published: 2003 }
      ],
      handleMouseEnter: this.handleMouseEnter.bind(this),
      handleMouseLeave: this.handleMouseLeave.bind(this),
      handleSort: this.handleSort.bind(this)
    }
  }

  originalRows() {
    return(
      [
        { title: 'Harry Potter', author: 'J. K. Rowling', genre: 'Fantasy', year_published: 1990 },
        { title: 'Lord of the rings', author: 'J.R.R Tolkien', genre: 'Fantasy', year_published: 1950 },
        { title: 'Eloquent Ruby', author: 'Some guy', genre: 'Learning', year_published: 2003 }
      ]
    )
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
  // Stolen wholesale from
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  sortRows(order, sortAttribute) {
    let sortedRows = this.state.rows.sort((a, b) => a[sortAttribute].toString().localeCompare(b[sortAttribute].toString()));
    order == 'desc' ? sortedRows.reverse() : sortedRows
    this.setState({rows: sortedRows})
  }

  handleSort(event) {
    // If the class is already sorted down switch to up
    if (event.currentTarget.classList.contains('react-table__sort-down')) {
      this.removeSortingClasses()
      event.currentTarget.classList.remove('react-table__sort-down');
      event.currentTarget.classList.add('react-table__sort-up');
      this.sortRows('asc', event.currentTarget.getAttribute('data-sort'));
    // If class is up don't sort
    } else if (event.currentTarget.classList.contains('react-table__sort-up'))  {
      this.removeSortingClasses()
      this.setState({rows: this.originalRows()})
    } else {
      this.removeSortingClasses()
      event.currentTarget.classList.add('react-table__sort-down');
      this.sortRows('desc', event.currentTarget.getAttribute('data-sort'))
    }
  }

  render() {
    return(
      <Presenter
        {...this.state}
      />
    )
  }
}

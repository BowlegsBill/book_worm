import React from 'react'
import ReactDOM from 'react-dom'
import LoadingOverlay from 'react-loading-overlay'

export default class ReadList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: true
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/books/read_list',
      dataType: 'json',
      success: (data) => {
        this.setState({books: data, isLoading: false})
      }
    })
  }

  render() {
    var books = this.state.books.map(function(book, index) {
      return(
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
        </tr>
      )
    })
    return (
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books}
        </tbody>
      </table>
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import LoadingOverlay from 'react-loading-overlay'
import ReadForm from './read_form'
import ReadingListForm from './reading_list_form'

class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: true
    }
  }

  // componentDidMount() {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/books',
  //     dataType: 'json',
  //     success: (data) => {
  //       this.setState({books: data, isLoading: false})
  //     }
  //   })
  // }

  handleChange(e) {
    if (e.target.value.length >= 3) {
      var stateObj = {}
      stateObj[e.target.name] = e.target.value
      $.ajax({
        type: 'POST',
        url: '/books/search',
        data: stateObj,
        dataType: 'json',
        success: (data) => {
          this.setState({books: data})
        }
      })
    }
  }


  renderBooks() {
    var books = this.state.books.map(function(book, index) {
      return(
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{<ReadingListForm book={book} />}</td>
          <td>{<ReadForm book={book} />}</td>
        </tr>
      )
    })
    if (this.state.books.length > 0) {
      return (
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books}
          </tbody>
        </table>
      )
    } else {
      return(
        <h3>Search by title or author for books to add to your reading list</h3>
      )
    }
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col-lg-6">
            <label>Title</label>
            <input type="text" name='title' className="form-control" placeholder='Search by title' autoComplete='off' onChange={this.handleChange.bind(this)} />
          </div>
          <div className="col-lg-6">
            <label>Author</label>
            <input type="text" name='author' className="form-control" placeholder='Search by author' autoComplete='off' onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        {this.renderBooks()}
      </div>
    )
  }
}

export default Books

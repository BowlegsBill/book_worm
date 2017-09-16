import React from 'react'
import ReactDOM from 'react-dom'


class Show extends React.Component {

  initialState() {
    return { title: '', author: '', }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState()
    this.state = {
      books: this.props.books
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      url: this.props.path,
      data: { book: this.state },
      type: 'POST',
      dataType: 'json',
      success: (data) => {
        var books = this.state.books.slice()
        books.unshift(data)
        this.setState({books: books})
        this.setState(this.initialState())
      }
    })
  }

  handleChange(e) {
    var name = e.target.name
    this.setState({name: e.target.value})
  }

  render() {
    var books = this.state.books.map(function(book, index) {
      return(
        <tr>
          <td>{book.title}</td>
          <td>{book.author}</td>
        </tr>
      )
    })
    return (
      <div className='content-wrap'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>Add New Book</h2>
          <div className='form-group'>
            <label htmlFor='title'>
              Title
            </label>
            <input onChange={(e) => this.setState({title: e.target.value})} className='form-control' id='title' name='title' value={this.state.title} />
          </div>
          <div className='form-group'>
            <label htmlFor='author'>
              Author
            </label>
            <input onChange={(e) => this.setState({author: e.target.value})} className='form-control' id='author' name='author' value={this.state.author} />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              Add Book
            </button>
          </div>
        </form>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Author</td>
            </tr>
          </thead>
          <tbody>
            {books}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Show

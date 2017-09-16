import React from 'react'
import ReactDOM from 'react-dom'

export default class BookForm extends React.Component {
  initialState() {
    return { title: '', author: '' }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      url: '/books',
      data: { book: this.state },
      type: 'POST',
      dataType: 'json',
      success: (data) => {
        this.setState(this.initialState())
      }
    })
  }

  handleChange(e) {
    var name = e.target.name
    this.setState({name: e.target.value})
  }

  render() {
    return(
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
    )
  }
}

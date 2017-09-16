import React from 'react'
import ReactDOM from 'react-dom'

export default class BookForm extends React.Component {
  initialState() {
    return { title: '', author: '', errors: [] }
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
        if (data.errors.length > 0) {
          this.setState({errors: data.errors})
        }
      }
    })
  }

  handleChange(e) {
    var name = e.target.name
    this.setState({name: e.target.value})
  }

  showErrors() {
    if (this.state.errors.length > 0) {
      var errors = this.state.errors.map(function(error, index) {
        return(
          <span key={index}>{error}<br /></span>
        )
      })
      return(
        <div className='alert alert-danger alert-dismissible' role='alert'>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {errors}
        </div>
      )
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.showErrors()}
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

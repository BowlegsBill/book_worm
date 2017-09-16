import React from 'react'
import ReactDOM from 'react-dom'

export default class ReadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: this.props.book,
      read: this.props.book.read
    }
  }

  handleClick() {
    $.ajax({
      type: 'PATCH',
      url: '/books_readers',
      data: { book_id: this.state.book.id },
      dataType: '',
      success: (data) => {
        this.setState({read: true})
      }
    })
  }

  render() {
    if (this.state.read) {
      return(
        <span>On Read list</span>
      )
    } else {
      return(
        <a className='decorated' onClick={this.handleClick.bind(this)}>Mark as Read</a>
      )
    }
  }
}

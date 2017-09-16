import React from 'react'
import ReactDOM from 'react-dom'

export default class ReadingListForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: this.props.book,
      readingList: this.props.book.reading_list
    }
  }

  handleClick() {
    $.ajax({
      type: 'POST',
      url: '/books_readers',
      data: { book_id: this.state.book.id },
      dataType: 'json',
      success: (data) => {
        this.setState({readingList: true})
      }
    })
  }

  render() {
    if (this.state.readingList) {
      return(
        <span>On Reading List</span>
      )
    } else {
      return(
        <a className='decorated' onClick={this.handleClick.bind(this)}>Add to reading list</a>
      )
    }
  }
}

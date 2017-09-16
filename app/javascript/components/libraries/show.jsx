import React from 'react'
import ReactDOM from 'react-dom'
import Books from './books'
import BookForm from './book_form'
import ReadingList from './reading_list'
import ReadList from './read_list'

class Show extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 'All Books'
    }
  }

  tabLinks(link) {
    if (this.state.selected == link) {
      return 'tab-links__link tab-links__link--active'
    } else {
      return 'tab-links__link'
    }
  }

  renderSelected() {
    if (this.state.selected == 'All Books') {
      return (<Books />)
    } else if (this.state.selected == 'Reading List') {
      return(<ReadingList />)
    } else if (this.state.selected == 'Read List') {
      return(<ReadList />)
    } else if (this.state.selected == 'Add Book') {
       return(
        <BookForm />
      )
    }
  }

  render() {
    return (
      <div className='content-wrap'>
        <div className='content-section'>
          <ul className='tab-links'>
            <li className={this.tabLinks('All Books')} onClick={(e) => this.setState({selected: e.target.innerText})}>All Books</li>
            <li className={this.tabLinks('Reading List')} onClick={(e) => this.setState({selected: e.target.innerText})}>Reading List</li>
            <li className={this.tabLinks('Read List')} onClick={(e) => this.setState({selected: e.target.innerText})}>Read List</li>
            <li className={this.tabLinks('Add Book')} onClick={(e) => this.setState({selected: e.target.innerText})}>Add Book</li>
          </ul>
          <header className='content-section__header'>
            <h2 className='content-section__title'>{this.state.selected}</h2>
          </header>
          <div className='content-section__content'>
            {this.renderSelected()}
          </div>
        </div>
      </div>
    )
  }
}

export default Show

import React, { Component, Fragment } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBook, updateBook } from '../reducers/action';

const fields = [{
  displayName: 'Title',
  value: 'title'
},
{
  displayName: 'Authors',
  value: 'authors',
  join: true,
},
{
  displayName: 'Categories',
  value: 'categories',
  join: true
}];

export class AddEditBook extends Component {
  constructor(props) {
    super(props);
    this.onSaveBook = this.onSaveBook.bind(this);
    this.state = {
      redirectToList: false,
      book: {
        title: '',
        isbn: null,
        pageCount: 0,
        thumbnailUrl: 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/jones6.jpg',
        status: null,
        authors: [],
        categories: [],
      },
    }
  }

  componentWillMount() {
    const { selectedBook } = this.props;
    if (selectedBook && selectedBook.isbn) {
      this.setState({ book: selectedBook });
    }
  }

  onSaveBook() {
    const { selectedBook, createBook, updateBook, onCancel } = this.props;
    const { book } = this.state;
    if (selectedBook.isbn) {
      updateBook(book).then(() => {
        onCancel();
      });
    } else {
      createBook(book).then(() => {
        this.setState({ redirectToList: true });
      });
    }
  }


  onChangeHandler(e, field) {
    if (field.join) {
      this.setState({ book: { ...this.state.book, [field.value]: e.target.value.split(',') } })
    } else {
      this.setState({ book: { ...this.state.book, [field.value]: e.target.value } })
    }
  }

  goBack() {
    this.setState({ redirectToList: true });
  }

  render() {
    const { selectedBook, onCancel } = this.props;
    const { redirectToList, book } = this.state;
    if (redirectToList) {
      return (<Redirect to="/list" />);
    }

    return (
      <div className="overlay">
        <div className="popup">
          <h3>{selectedBook && selectedBook.isbn ? 'Edit Book' : 'Add Book'}</h3>
          <form>
            {fields.map(field => (
              <div className="form-field" key={field.value}>
                <label htmlFor={field.value}>{field.displayName}</label>
                <input type="text" value={book[field.value]} id={field.value} name={field.value} onChange={(e) => this.onChangeHandler(e, field)} />
              </div>
            ))}

          </form>
          <div className="footer">
            <button onClick={this.onSaveBook}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  createBook,
  updateBook,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditBook)

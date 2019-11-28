import React, { Component, Fragment } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AddEditBook from './AddEditBook';
import { fetchBookDetail, removeBook } from '../reducers/action';

export class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      redirectToList: false,
      isEdit: false,
    }
  }

  componentWillMount() {
    this.props.fetchBookDetail(this.props.match.params.id);
  }

  onDeleteBook() {
    const { selectedBook, removeBook } = this.props;
    removeBook(selectedBook.isbn).then(() => {
      this.setState({ redirectToList: true });
    })
  }

  onEditClick() {
    this.setState({ isEdit: true });
  }

  onCancel() {
    this.setState({ isEdit: false });
  }

  render() {
    const { selectedBook } = this.props;
    const { redirectToList, isEdit } = this.state;
    if (redirectToList) {
      return (<Redirect to="/list" />);
    }
    return (
      <Fragment>
        {isEdit && <AddEditBook selectedBook={selectedBook} onCancel={this.onCancel}/>}
        <Fragment>
          <h1>Books Details</h1>
          <button onClick={this.onDeleteBook}>Remove</button>
          <button onClick={this.onEditClick.bind(this)}>Edit</button>
          <NavLink to="/list">Back</NavLink>

        </Fragment>
        <hr />
        <div className="detail row">
          <div className="col-2">
            <img src={selectedBook.thumbnailUrl} alt="Loading..." />
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-2">Title: </div>
              <div className="col-10">{selectedBook.title}</div>
            </div>
            <div className="row">
              <div className="col-2">Page Count: </div>
              <div className="col-10">{selectedBook.pageCount}</div>
            </div>
            <div className="row">
              <div className="col-2">Published Date: </div>
              <div className="col-10">{selectedBook.publishedDate && selectedBook.publishedDate['$date']}</div>
            </div>
            <div className="row">
              <div className="col-2">Status: </div>
              <div className="col-10">{selectedBook.status}</div>
            </div>
            <div className="row">
              <div className="col-2">Authors: </div>
              <div className="col-10">{selectedBook.authors && selectedBook.authors.join(', ')}</div>
            </div>
            <div className="row">
              <div className="col-2">Categories: </div>
              <div className="col-10">{selectedBook.categories && selectedBook.categories.join(', ')}</div>
            </div>
          </div>
        </div>
      </Fragment>

    )
  }
}

const mapStateToProps = (state) => ({
  selectedBook: state.selectedBook,
})

const mapDispatchToProps = {
  fetchBookDetail,
  removeBook,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)

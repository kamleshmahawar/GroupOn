import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddEditBook from './AddEditBook';
import { fetchBooks } from '../reducers/action';

export class BookList extends Component {
  constructor(props) {
    super(props);
    this.gotoDetails = this.gotoDetails.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      redirectToDetail: false,
      isAddMode: false,
    }
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  gotoDetails(book) {
    this.setState({ redirectToDetail: book });
  }

  onCreate() {
    this.setState({ isAddMode: true });
  }

  onCancel() {
    this.setState({ isAddMode: false });
  }

  render() {
    const { redirectToDetail, isAddMode } = this.state;
    if (redirectToDetail) {
      return (<Redirect to={`/list/${redirectToDetail.isbn}`} />);
    }
    return (
      <Fragment>
        {isAddMode && <AddEditBook selectedBook={{}} onCancel={this.onCancel}/>}
        <Fragment>
          <h1>Books List</h1>
          <button onClick={this.onCreate.bind(this)}>Add</button>
        </Fragment>
        <hr />
        <table className="table" >
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Page Count</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data && this.props.data.map(book =>
              <tr onClick={() => { this.gotoDetails(book) }} key={book.isbn}>
                <td>
                  <img src={book.thumbnailUrl} alt="Loading..." />
                </td>
                <td>{book.title}</td>
                <td>{book.pageCount}</td>
                <td>{book.status}</td>
              </tr>)
            }
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = {
  fetchBooks,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)

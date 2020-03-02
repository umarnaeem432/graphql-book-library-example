import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import {getBooksQuery} from '../queries/queries';

class BookList extends Component {

  displayBooks() {
    let data = this.props.data;
    if(data.loading) {
      return (
        <div>Loading Books...</div>
      );
    } else {
      return data.books.map(book => {
        return(
          <li key={book._id}>{book.name}</li>
        );
      })
    }
  }

  render () {
    return (
      <div>
        {this.displayBooks()}
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

import { gql } from 'apollo-boost';

// construct a query.
const getAuthorsQuery = gql`
  {
    authors {
        name
        _id
    }
  }
`

// construct a query.
const getBooksQuery = gql`
  {
    books{
      name
      _id
    }
  }
`

export {
    getAuthorsQuery,
    getBooksQuery
}

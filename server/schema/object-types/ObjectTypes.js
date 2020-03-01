const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

// Data
const books = require('../../data/books');
const authors = require('../../data/authors');

exports.BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLString
    },

    name: {
      type: GraphQLString
    },

    genre: {
      type: GraphQLString
    },

    author: {
      type: this.AuthorType,
      args: {
        authorID: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        return _.find(authors, { id: parent.authorID });
      }
    }
  })
});

exports.AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: {
    id: {
      type: GraphQLString
    },

    name: {
      type: GraphQLString
    },

    age: {
      type: GraphQLInt
    },

    books: {
      type: new GraphQLList(this.BookType),
      resolve: (parent, args) => {
        return _.filter(books, { authorID: parent.id });
      }
    }
  }
});
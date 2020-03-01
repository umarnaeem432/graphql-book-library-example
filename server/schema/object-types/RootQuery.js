const _ = require("lodash");
const { 
    GraphQLObjectType, 
    GraphQLString, 
} = require('graphql');

// dummy data
const books = require('../../data/books');
const authors = require('../../data/authors');

// Object Types
const {BookType, AuthorType} = require('./ObjectTypes');

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = RootQuery;
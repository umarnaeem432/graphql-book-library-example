const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

const Book = require('../../models/book');
const Author = require('../../models/author');

exports.BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    _id: {
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
        return Author.findById(parent.authorID);
      }
    }
  })
});

exports.AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: {
    _id: {
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
        return Book.find({authorID: parent._id});
      }
    }
  }
});
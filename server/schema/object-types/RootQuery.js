const _ = require("lodash");
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLList,
    GraphQLInt,
} = require('graphql');

const Book = require('../../models/book');
const Author = require('../../models/author');

// Object Types
const {BookType, AuthorType} = require('./ObjectTypes');

exports.RootQuery = new GraphQLObjectType({
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
        return Book.findById(args.id);
      }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve: (parent, args) => {
            return Book.find();
        },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        return Author.findById(args.id);
      }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve: (parent, args) => {
          return Author.find();
        }
    }
  }
});


exports.Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        }
      },
      resolve: (parent, args) => {
        const author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      }
    },

    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },

        genre: {
          type: GraphQLString,
        },

        authorID: {
          type: GraphQLString,
        }
      },
      resolve: (parent, args) => {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID,
        });

        return book.save();
      }
    }
  }
});
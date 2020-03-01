const graphql = require("graphql");
const _ = require("lodash");

// dummy data
const books = require('../data/books');
const authors = require('../data/authors');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
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
        type: AuthorType,
        args: {
            authorID: {
                type: GraphQLString
            },
        },
        resolve: (parent, args) => {
            return _.find(authors, {id: parent.authorID});
        }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: {
    id: {
      type: GraphQLString
    },
    
    name: {
        type: GraphQLString,
    },

    age: {
        type: GraphQLInt,
    }
  }
});

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
                type: GraphQLString,
            }
        },
        resolve: (parent, args) => {
            return _.find(authors, {id: args.id});
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

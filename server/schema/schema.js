const { GraphQLSchema } = require("graphql");

// Root Query
const { RootQuery, Mutation } = require('./object-types/RootQuery');



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

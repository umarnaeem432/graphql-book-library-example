const { GraphQLSchema } = require("graphql");

// Root Query
const RootQuery = require('./object-types/RootQuery');



module.exports = new GraphQLSchema({
  query: RootQuery
});

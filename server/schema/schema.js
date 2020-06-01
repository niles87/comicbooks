const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const ComicBookType = new GraphQLObjectType({
  name: "Comic",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    comic: {
      type: ComicBookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

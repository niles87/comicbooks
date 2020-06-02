const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
var comics = [
  { name: "Spider-man", publisher: "Marvel", id: "1" },
  { name: "Superman", publisher: "DC", id: "2" },
  { name: "Avengers", publisher: "Marvel", id: "3" },
];

var heroes = [
  { name: "Superman", skills: "Kryptonian", id: "1" },
  { name: "Spiderman", skills: "Spider Strength", id: "2" },
  { name: "Thor", skills: "Control Lightning", id: "3" },
];

const ComicBookType = new GraphQLObjectType({
  name: "Comic",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publisher: { type: GraphQLString },
  }),
});

const HeroType = new GraphQLObjectType({
  name: "Hero",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    skills: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    comic: {
      type: ComicBookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(comics, { id: args.id });
      },
    },
    hero: {
      type: HeroType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(heroes, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

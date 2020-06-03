const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

// dummy data
var comics = [
  { name: "Spider-man", publisher: "Marvel", id: "1", heroId: "2" },
  { name: "Superman", publisher: "DC", id: "2", heroId: "1" },
  { name: "Avengers", publisher: "Marvel", id: "3", heroId: "3" },
  { name: "Venom", publisher: "Marvel", id: "4", heroId: "2" },
  { name: "Justice League", publisher: "DC", id: "5", heroId: "1" },
  { name: "Dark World", publisher: "Marvel", id: "6", heroId: "3" },
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
    hero: {
      type: HeroType,
      resolve(parent, args) {
        return _.find(heroes, { id: parent.heroId });
      },
    },
  }),
});

const HeroType = new GraphQLObjectType({
  name: "Hero",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    skills: { type: GraphQLString },
    comic: {
      type: new GraphQLList(ComicBookType),
      resolve(parent, args) {
        return _.filter(comics, { heroId: parent.id });
      },
    },
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
    comicbooks: {
      type: new GraphQLList(ComicBookType),
      resolve(parent, args) {
        return comics;
      },
    },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve(parent, args) {
        return heroes;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

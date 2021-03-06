const graphql = require("graphql");
const _ = require("lodash");
const Comic = require("../models/comics");
const Hero = require("../models/hero");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ComicBookType = new GraphQLObjectType({
  name: "Comic",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publisher: { type: GraphQLString },
    hero: {
      type: HeroType,
      resolve(parent, args) {
        // return _.find(heroes, { id: parent.heroId });
        return Hero.findById(parent.heroId);
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
        // return _.filter(comics, { heroId: parent.id });
        return Comic.find({ heroId: parent.id });
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
        // return _.find(comics, { id: args.id });
        return Comic.findById(args.id);
      },
    },
    hero: {
      type: HeroType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(heroes, { id: args.id });
        return Hero.findById(args.id);
      },
    },
    comicbooks: {
      type: new GraphQLList(ComicBookType),
      resolve(parent, args) {
        // return comics;
        return Comic.find();
      },
    },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve(parent, args) {
        // return heroes;
        return Hero.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addHero: {
      type: HeroType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        skills: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let hero = new Hero({
          name: args.name,
          skills: args.skills,
        });
        return hero.save();
      },
    },
    addComic: {
      type: ComicBookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        publisher: { type: new GraphQLNonNull(GraphQLString) },
        heroId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let comic = new Comic({
          name: args.name,
          publisher: args.publisher,
          heroId: args.heroId,
        });
        return comic.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Dependency Imports
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
// Relative Imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 2200 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

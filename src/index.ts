import "reflect-metadata";
import * as path from "path";
import * as dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import { mergeTypes, mergeResolvers, fileLoader } from "merge-graphql-schemas";

dotenv.load();

const typesArray = fileLoader(path.join(__dirname, "schema/*.graphql"));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, "resolvers/*.ts"));
const resolvers = mergeResolvers(resolversArray);

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request
  })
});

const options = {
  port: process.env.PORT || 4001,
  endpoint: "/",
  playground: "/playground"
};

server.start(options, ({ port, playground }) =>
  console.log(
    `GraphQL Playground is running at http://localhost:${port}${playground}`
  )
);

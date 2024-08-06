import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'

import { ApolloServer } from "@apollo/server"
// import { startStandaloneServer } from "@apollo/server/standalone"

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"
import { dbConnection } from './db/dbConnection.js';

const app = express();
const httpServer = http.createServer(app);
dotenv.config()
 
const server = new ApolloServer({
  typeDefs: mergedTypeDefs ,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
 
// const { url } = await startStandaloneServer(server)
await server.start();

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await dbConnection()

console.log(`🚀 Server ready at http://localhost:4000/`);
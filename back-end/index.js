import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import job from './cron.js';

import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session'

import { buildContext } from "graphql-passport";

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"
import { dbConnection } from './db/dbConnection.js';
import { configurePassport } from './passport/passport.config.js';

const app = express();
const httpServer = http.createServer(app);
const __dirname = path.resolve()

dotenv.config()
configurePassport()
job.start()

await dbConnection()
 
const server = new ApolloServer({
  typeDefs: mergedTypeDefs ,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
 
await server.start();

// --- storing session in DB
const MongoDBStore = connectMongo(session)

const store = new MongoDBStore({
  uri:process.env.MONGO_URI,
  collection:'sessions'
})

store.on("error" , err => {console.log(err)})
// ---

app.use(
  session({
    secret:process.env.SECRECT_KEY,
    resave:false, // ? save session on every request
    saveUninitialized:false ,
    store:store,  
    cookie:{
      maxAge:1000 * 60 * 60 * 24 * 7, // ? 1 week
      httpOnly:true, // ? prevents XSS attacks
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
  '/graphql',
  cors({
    origin:'http://localhost:3000',
    credentials:true
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({req,res}) =>  buildContext({req,res}) ,
  }),
);

app.use(express.static(path.join(__dirname,'front-end/dist')))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'front-end/dist','index.html'))
})

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
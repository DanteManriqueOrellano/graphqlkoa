import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { execute, subscribe } from 'graphql'
import Koa from "koa";
import { createServer } from "http";
import koabody from "koa-body";
import Router from "koa-router";
import cors from 'koa2-cors'
import { schemas } from "./src/graphql/schemas/indexSchema";
import { connectFireBase } from "./src/store/dataStore";
const { Firestore } = require('@google-cloud/firestore');
const { FirestoreStore } = require('@google-cloud/connect-firestore');
const port = process.env.PORT || 3000
const main = async () => {
    connectFireBase()
    const app = new Koa();
    const router = new Router();
    const apolloServer = new ApolloServer({
        introspection: true,
        schema: await schemas,
        playground: true,
        context: (req) => {
            const { session } = req.ctx;

            // return an object with whatever properties you 
            // need to be accessible inside resolvers as `context`
            return {
                userSession: session
            }
        }
    });
    app.use(cors({
        origin: function(ctx) {
          if (ctx.url === '/test') {
            return false;
          }
          return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }));

    apolloServer.applyMiddleware({ app, path: '/joder', cors: true });

    app.use(koabody());

    router.get("/ping", async ctx => {
        ctx.body = "pong";
    });

    app.use(router.routes());

    const server = createServer(app.callback());

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
};

export default main;
main()


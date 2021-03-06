import { importSchema } from 'graphql-import'
import { GraphQLServer } from 'graphql-yoga';
import * as path from "path";
import * as  fs from 'fs';
import * as Redis from "ioredis";

import { mergeSchemas, makeExecutableSchema } from "graphql-tools"
import { GraphQLSchema } from "graphql";

import { createTypeormConn } from './utils/createTypeormConn';
import { User } from './entity/User';

export const startServer = async () => {
    const schemas: GraphQLSchema[] = [];
    const folders = fs.readdirSync(path.join(__dirname,"./modules"));
    folders.forEach((folder) => {
        const { resolvers } = require(`./modules/${folder}/resolvers`);
        const typeDefs = importSchema(
            path.join(__dirname, `./modules/${folder}/schema.graphql`)
        );
        schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
    });

    const redis = new Redis();

    const schema:any = mergeSchemas({ schemas });

    const server = new GraphQLServer({ schema, context: ({ request }) => ({
            redis, url: request.protocol + "://" + request.get("host")  
        }) 
    });

    server.express.get("/confirm/:id", async (req, res) => {
        const { id } = req.params;
        const userId = await redis.get(id);
        if (userId) {
            await User.update({ id: userId }, { confirmed: true });
            await redis.del(id);
            res.send("ok");
        } else {
        res.send("invalid");
        }
    });

    await createTypeormConn();
    const app = await server.start({port: process.env.NODE_ENV === "test" ? 4000 : 4000});
    console.log('Server is running on localhost:4000');

    return app;
};
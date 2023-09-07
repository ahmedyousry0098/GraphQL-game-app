import express from 'express'
import {readFile} from 'node:fs/promises'
import {ApolloServer} from '@apollo/server'
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import { connectDB } from './src/db/connection.js'
import { resolvers } from './src/graphql/resolver.js'
import dotenv from 'dotenv'
dotenv.config({path: "./config/.env"})

const app = express()
const PORT = process.env.PORT

connectDB()

const typeDefs = await readFile('./src/graphql/schema.graphql', 'utf8')

const server = new ApolloServer({
    typeDefs,
    resolvers
})
await server.start()

function getCtx({req}) {
    return req.body
}

app.use('/graphql', cors(), express.json(), apolloMiddleware(server, {context: getCtx}))

app.listen(PORT, () => {
    console.log(`App Listening On Port ${PORT}`);
})
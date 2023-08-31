import express from 'express'
import {readFile} from 'node:fs/promises'
import {ApolloServer} from '@apollo/server'
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import { connectDB } from './src/db/connection.js'
import { resolvers } from './src/graphql/resolver.js'
import { config } from 'dotenv'
config({path:"./config/.env"})

const app = express()
const PORT = 9000

connectDB()

const typeDefs = await readFile('./src/graphql/schema.graphql', 'utf8')

const server = new ApolloServer({
    typeDefs,
    resolvers
})
await server.start()

app.use('/graphql', cors(), express.json(), apolloMiddleware(server))

app.listen(PORT, () => {
    console.log(`App Listening On Port ${PORT}`);
})
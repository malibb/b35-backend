require('dotenv').config();
const { GraphQLServer, PubSub } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/resolvers/Directives/AuthDirectives');
const verifyToken = require('./src/utils/verifyToken');

const mongoose = require('mongoose');

const MONGO_URI = process.env.NODE_ENV === 'test' ?
    process.env.MONGO_TEST_URL: process.env.MONGO_URL;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => {});

const typeDefs = importSchema(__dirname + '/schema.graphql');


/* ` 
    type Query{
        hello(name: String!):String!
        getAllUsers:[User]
    }
    type Mutation{
        createUser(name: String!,age:Int!):User
    }
    type User{
        id: Int!
        name: String!
        age:Int!
    }
 `;

const users=[];

const resolvers = {
    Query:{
        hello:(root, params, context, info) => `Hola ${params.name}`,
        getAllUsers:(root, params, context, info) => users,
    },
    Mutation:{
        createUser:(root, params, context, info) =>{
            const user = {
                id: users.length+1,
                name:params.name,
                age:params.age,
            };
            users.push(user);
            return user;
        }
    }
}; */
 
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    },
});

const port = process.env.PORT || 4000;

const pubsub = new PubSub();

const server = new GraphQLServer({
    schema,
    context: async (req) => ({
        ...req,
        pubsub,
        user: req.request ? await verifyToken(req.request) : { }
    })
});

server.start({ port },() => {});

module.exports = { schema };
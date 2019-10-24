const { GraphQLServer } = require('graphql-yoga');

const typeDefs = ` 
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
 };

const server = new GraphQLServer({ typeDefs, resolvers});

server.start(() => console.log('Works! :D'));
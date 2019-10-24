const AuthorResolver = require('./AuthorResolvers');

module.exports = {
    Query:{
        ...AuthorResolver.Query
    },
    Mutations:{
        ...AuthorResolver.Mutation
    }
};

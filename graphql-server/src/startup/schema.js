const { makeExecutableSchema } = require('apollo-server-koa')
const merge = require('lodash.merge');

const rootTypeDefs = require('../features/common/rootSchema');
const paginationTypeDefs = require('../features/common/paginationSchema');

const userTypeDefs = require('../features/user/schema');
const userResolvers = require('../features/user/resolvers');

const participantTypeDefs = require('../features/participant/schema');
const participantResolvers = require('../features/participant/resolvers')

const typeDefs = [rootTypeDefs, paginationTypeDefs, userTypeDefs, participantTypeDefs]
const resolvers = merge(userResolvers, participantResolvers)

module.exports = makeExecutableSchema({ typeDefs, resolvers });
module.exports.tests = { typeDefs, resolvers }

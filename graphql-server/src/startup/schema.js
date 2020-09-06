const { makeExecutableSchema } = require('apollo-server-koa')
const merge = require('lodash.merge');

const rootTypeDefs = require('../features/common/rootSchema');
const paginationTypeDefs = require('../features/common/paginationSchema');

const userTypeDefs = require('../features/user/schema');
const userResolvers = require('../features/user/resolvers');

const helloWorldTypeDefs = require('../features/helloWorld/schema');
const helloWorldResolvers = require('../features/helloWorld/resolvers');

const conferenceTypeDefs = require('../features/conference/schema');
const conferenceResolvers = require('../features/conference/resolvers')

const dictionariesResolvers = require('../features/dictionaries/resolvers');
const dictionariesTypeDefs = require('../features/dictionaries/schema');

const typeDefs = [rootTypeDefs, paginationTypeDefs, userTypeDefs, helloWorldTypeDefs, conferenceTypeDefs, dictionariesTypeDefs]
const resolvers = merge(userResolvers, helloWorldResolvers, conferenceResolvers, dictionariesResolvers)

module.exports = makeExecutableSchema({ typeDefs, resolvers });
module.exports.tests = { typeDefs, resolvers }
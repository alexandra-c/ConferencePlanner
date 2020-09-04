const { gql } = require("apollo-server-koa");

const dictionaryTypeDefs = gql`

  type Category {
    id: Int!
    name: String!
    code: String
  }

  type Type {
    id: Int!
    name: String!
    code: String
  }

  type Country {
    id: Int!
    name: String!
    code: String    
  }

  type County {
    id: Int!
    name: String!
    code: String    
  }

  type City {
    id: Int!
    name: String!
    code: String    
  }

  extend type Query {
    categoryList: [Category!]!
    typeList: [Type!]!
    statusList: [Status!]!
    countryList: [Country!]!
    countyList: [County!]!
    cityList: [City!]!
  }
`;

module.exports = dictionaryTypeDefs;
const { gql } = require("apollo-server-koa");

const conferenceTypeDefs = gql`

  type ConferenceList {
    values: [Conference!]!
    pagination(pager: PagerInput!, filters: ConferenceFilterInput): Pagination
  }

  type Conference {
    id: ID!
    name: String!
    startDate: DateTime!
    endDate: DateTime!
    type: String
    category: String
    location: Location!
    speakers: [Speaker]!
    status: String
  }

  type Location {
    id: ID!
    name: String
    code: String
    address: String
    latitude: String
    longitude: String
    city: City!
    county: County!
    country: Country!
  }

  type City {
    id: ID!
    name: String!
    code: String
  }

  type County {
    id: ID!
    name: String!
    code: String
  }

  type Country {
    id: ID!
    name: String!
    code: String
  }

  type Speaker {
    id: ID!
    name: String
    isMainSpeaker: Boolean
    nationality: String
    rating: Float
  }

  type Address {
    id: ID!
    city: String
    county: String
    country: String
  }

  input ConferenceFilterInput {
    startDate: DateTime
    endDate: DateTime
  }

  extend type Query {
    conferenceList(pager: PagerInput!, filters: ConferenceFilterInput): ConferenceList
  }
`

module.exports = conferenceTypeDefs
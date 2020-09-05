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
    speakers: [Speaker!]!
    status(userEmail: String!): Status
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

  type Status {
    id: ID!
    name: String!
  }

  input ConferenceFilterInput {
    startDate: DateTime
    endDate: DateTime
    organiserEmail: String
  }

  input Attendee {
    attendeeEmail: String!
    conferenceId: ID!
    statusId: ID!
  }

  extend type Query {
    conferenceList(pager: PagerInput!, filters: ConferenceFilterInput): ConferenceList
  }

  extend type Mutation {
    attend(input: Attendee!): String    
  }
`

module.exports = conferenceTypeDefs
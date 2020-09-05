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
    type: Type
    category: Category
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

  input Attendee {
    id: ID!
    attendeeEmail: String!
    conferenceId: ID!
    statusId:ID!
  }

  extend type Query {
    myConference(id: ID!): Conference!
    conferenceList(pager: PagerInput!, filters: ConferenceFilterInput, organizerEmail: String): ConferenceList
  }

  extend type Mutation {
    attend(input: Attendee!): Boolean    
  }
`

module.exports = conferenceTypeDefs
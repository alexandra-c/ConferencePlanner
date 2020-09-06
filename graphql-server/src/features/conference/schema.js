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

  type Speaker {
    id: ID!
    name: String
    isMainSpeaker: Boolean
    nationality: String
    rating: Float
  }

  type Status {
    id: ID!
    name: String!
  }

  input ConferenceFilterInput {
    startDate: DateTime
    endDate: DateTime
    organizerEmail: String
  }

  input Attendee {
    attendeeEmail: String!
    conferenceId: ID!
  }

  input ConferenceInput {
    id: ID!
    name: String!
    startDate: DateTime!
    endDate: DateTime!
    type: TypeInput
    category: CategoryInput
    location: LocationInput!
    speakers: [SpeakerInput!]!
    deletedSpeakers: [ID]
  }

  input LocationInput {
    id: ID!
    name: String
    code: String
    address: String
    latitude: String
    longitude: String
    cityId: ID!
    countyId: ID!
    countryId: ID!
  }

  input SpeakerInput {
    id: ID!
    name: String
    isMainSpeaker: Boolean
    nationality: String
    rating: Float
  }

  extend type Query {
    myConference(id: ID!): Conference!
    conferenceList(pager: PagerInput!, filters: ConferenceFilterInput): ConferenceList
  }

  extend type Mutation {
    attend(input: Attendee!): String    
    withdraw(input: Attendee!): String
    updateConference(input: ConferenceInput): Conference!
    deleteConference(id: ID!): String
  }
`

module.exports = conferenceTypeDefs
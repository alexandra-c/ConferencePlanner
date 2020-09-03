const { gql } = require("apollo-server-koa");

const participantTypeDefs = gql`

  type ParticipantList {
      values: [Participant!]!
      pagination(pager: PagerInput!, filters: ParticipantFilterInput): Pagination
  }

  type Participant {
      id: ID!
      name: String!
      startDate: DateTime!
      endDate: DateTime!
      type: String
      category: String
      address: Address!
      speakerName: String!
      status: String
  }

  type Address {
    city: String
    county: String
    country: String
  }

  input ParticipantFilterInput {
      startDate: DateTime
      endDate: DateTime
  }

  extend type Query {
      participantList(pager: PagerInput!, filters: ParticipantFilterInput): ParticipantList
  }
`

module.exports = participantTypeDefs
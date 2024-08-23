import { gql } from '@apollo/client'
import Fragments from './fragments'

export const CONFERENCE_LIST_QUERY = gql`
  query conferenceList($filters: ConferenceFilterInput, $userEmail: String!) {
    conferenceList(filters: $filters) {
      ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        id
        city {
          ...city
        }
        county {
          ...county
        }
        country {
          ...country
        }
      }
      speakers {
        ...speaker
      }
      status(userEmail: $userEmail) {
        ...status
      }
    }
  }
  ${Fragments.city}
  ${Fragments.county}
  ${Fragments.country}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.conference}
  ${Fragments.speaker}
  ${Fragments.status}
`

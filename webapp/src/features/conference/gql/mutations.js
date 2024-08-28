import { gql } from '@apollo/client'
import Fragments from './fragments'

export const UPDATE_CONFERENCE = gql`
  mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input) {
      ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        ...location
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
    }
  }
  ${Fragments.conference}
  ${Fragments.speaker}
  ${Fragments.location}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.city}
  ${Fragments.county}
  ${Fragments.country}
`

export const CHANGE_ATTENDANCE_STATUS_MUTATION = gql`
  mutation changeAttendanceStatus($input: Attendee!) {
    changeAttendanceStatus(input: $input)
  }
`

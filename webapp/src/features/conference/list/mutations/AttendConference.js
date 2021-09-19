import { gql } from '@apollo/client'
import CommonFragments from 'features/common/fragments'
import Fragments from '../fragments'

export const ATTEND_CONFERENCE_MUTATION = gql`
  mutation attend($input: Attendee!) {
    attend(input: $input) {
      code
      suggestedConferences {
        ...conference
        type {
          ...type
        }
        category {
          ...category
        }
        location {
          id
          address
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
  }
  ${CommonFragments.city}
  ${CommonFragments.county}
  ${CommonFragments.country}
  ${CommonFragments.type}
  ${CommonFragments.category}
  ${Fragments.conference}
  ${Fragments.speaker}
`

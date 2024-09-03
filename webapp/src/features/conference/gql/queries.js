import { gql } from '@apollo/client'
import Fragments from './fragments'

export const CONFERENCE_LIST_QUERY = gql`
  query conferenceList($filters: ConferenceFilterInput, $userEmail: String!) {
    conferenceList(filters: $filters, userEmail: $userEmail) {
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
export const CONFERENCE_QUERY = gql`
query conferenceData($id: Int!, $isNew: Boolean!) {
  conference(id: $id) @skip(if: $isNew){
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
      county{
        ...county
      }
      country{
        ...country
      }
    }
    speakers {
      ...speaker
    }
  }
  typeList {
    ...type
  }
  categoryList {
    ...category
  }
  cityList {
    ...city
  }
  countyList {
    ...county
  }
  countryList {
    ...country
  }
},
${Fragments.conference}
${Fragments.speaker}
${Fragments.location}
${Fragments.type}
${Fragments.category}
${Fragments.city}
${Fragments.county}
${Fragments.country}
`
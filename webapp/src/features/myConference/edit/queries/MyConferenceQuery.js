import { gql } from '@apollo/client';
import ConferenceFragments from "features/conference/list/fragments";
import CommonFragments from "features/common/fragments";

export const MY_CONFERENCE_QUERY = gql`
query myConferenceData($id: ID!, $isNew: Boolean!) {
  myConference(id: $id)@skip(if: $isNew){
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
${ConferenceFragments.conference}
${ConferenceFragments.speaker}
${CommonFragments.type}
${CommonFragments.category}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
${CommonFragments.location}
`

export const CONFERENCE_TYPE_QUERY = gql`
  query typeList{
      typeList{
      ...type
      }
  },
  ${CommonFragments.type}
`
import { gql } from "@apollo/client";
import CommonFragments from "features/common/fragments";

const Fragments = {
  conference: gql`
    fragment conference on Conference {
      id
      name
      startDate
      endDate
      type
      category
    }
  `,
  speaker: gql`
    fragment speaker on Speaker {
        id
        name
        isMainSpeaker
        nationality
        rating
    }
  `,
  conferenceItem: gql`
    fragment conferenceItem on Conference {
        ...conference
        location {
          ...CommonFragments.location
          city {
            ...CommonFragments.city
          }
          county{
            ...CommonFragments.county
          }
          country{
            ...CommonFragments.country
          }
        }
        speaker {
          ...speaker
        }
        status
    }
  `
};

export default Fragments;
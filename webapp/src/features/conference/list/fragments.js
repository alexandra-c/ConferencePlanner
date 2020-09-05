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
  status: gql`
    fragment status on Status {
      id
      name
    }
  `}

const ConferenceFragment = {
  conferenceItem: gql`
    fragment conferenceItem on Conference {
        ...conference
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
        status {
          ...status
        }
    }
${CommonFragments.location}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
${Fragments.conference}
${Fragments.status}
${Fragments.speaker}`
};

export default ConferenceFragment;
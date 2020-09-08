import { gql } from "@apollo/client";

const Fragments = {
  conference: gql`
    fragment conference on Conference {
      id
      name
      startDate
      endDate
      organizerEmail
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

export default Fragments;
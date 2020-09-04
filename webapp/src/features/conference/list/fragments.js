import { gql } from "@apollo/client";

const Fragments = {
  conferenceItem: gql`
    fragment conferenceItem on Conference {
        id
        name
        startDate
        endDate
        type
        category
        location {
          id
          name
          city {
            id
            name
          }
          county{
            id
            name
          }
          country{
            id
            name
          }
        }
        speaker {
          id
          name
          isMainSpeaker
          nationality
          rating
        }
        status
    }
  `,
};

export default Fragments;
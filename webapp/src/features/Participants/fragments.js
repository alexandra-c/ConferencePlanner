import { gql } from "@apollo/client";

const Fragments = {
  participantItem: gql`
    fragment participantItem on Participant {
        id
        name
        startDate
        endDate
        type
        category
        address
        speakerName
        status
    }
  `,
};

export default Fragments;
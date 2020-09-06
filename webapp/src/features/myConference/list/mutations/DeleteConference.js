import { gql } from '@apollo/client';

export const DELETE_CONFERENCE_MUTATION = gql`
mutation deleteConference($id: ID!) {
    deleteConference(id: $id)
},
`
import { gql } from "@apollo/client";

const CommonFragments = {
  paginationInfo: gql`
  fragment paginationInfo on Page {
    afterId
    sortBy
    direction
    pageSize
  }
`
}

export default CommonFragments;
import { gql } from "@apollo/client";

const CommonFragments = {
  paginationInfo: gql`
    fragment paginationInfo on Page {
      afterId
      sortBy
      direction
      pageSize
  }`,
  type: gql`
    fragment type on Type {
      id 
      name
      code
    }`,
  category: gql`
    fragment category on Category {
      id 
      name
      code
    }`,
  county: gql`
    fragment county on County {
      id 
      name
      code
    }`,
  country: gql`
    fragment country on Country {
      id 
      name
      code
    }`,
  location: gql`
    fragment location on Location {
      id
      name
      code
      address
      latitude
      longitude
    }
  `
}

export default CommonFragments;
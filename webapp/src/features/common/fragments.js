import { gql } from "@apollo/client";

const CommonFragments = {
  paginationInfo: gql`
    fragment paginationInfo on Page {
      page
      pageSize
  }`,
  city: gql`
    fragment city on City {
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
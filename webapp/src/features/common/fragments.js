import { gql } from "@apollo/client";

const CommonFragments = {
  paginationInfo: gql`
    fragment paginationInfo on Page {
      page
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
  city: gql`
    fragment city on City {
      id 
      name
      code
    }`,
  country: gql`
    fragment country on Country {
      id 
      name
      code
    }`
}

export default CommonFragments;
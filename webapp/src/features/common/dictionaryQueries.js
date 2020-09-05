import { gql } from '@apollo/client';
import CommonFragments from "features/common/fragments";

export const DICTIONARIES_QUERY = gql`
query dictionaries{
  typeList {
    ...type
  }
  categoryList {
    ...category
  }
  cityList {
    ...city
  }
  countyList {
    ...county
  }
  countryList {
    ...country
  }
},
${CommonFragments.type}
${CommonFragments.category}
${CommonFragments.city}
${CommonFragments.county}
${CommonFragments.country}
`
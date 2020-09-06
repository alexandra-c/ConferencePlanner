const { gql } = require("apollo-server-koa");

const paginationTypes = gql`
  input PagerInput {
    pageNumber: Int!
    pageSize: Int
  }

  type Page {
    pageNumber: Int
    pageSize: Int
  }

  type Pagination {
    currentPage: Page
    totalCount: Int
  }
`;

module.exports = paginationTypes;

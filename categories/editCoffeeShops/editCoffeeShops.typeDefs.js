import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShops(
      id: Int!
      name: String
      latitude: String
      longitude: String
      photo: Upload
      categories: String
    ): MutationResponse!
  }
`;

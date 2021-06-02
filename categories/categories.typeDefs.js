import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: Int!
    createdAt: String!
    updatedAt: String
    name: String!
    slug: String!
    totalCoffeeShop: Int!
    shops: [CoffeeShop]
  }

  type CoffeeShop {
    id: Int!
    createdAt: String!
    updatedAt: String
    name: String!
    latitude: String
    longitude: String
    photos: [CoffeeShopPhoto]
    categories: [Category]
    user: User!
  }

  type CoffeeShopPhoto {
    id: Int!
    createdAt: String!
    updatedAt: String
    url: String!
    shop: CoffeeShop
  }
`;

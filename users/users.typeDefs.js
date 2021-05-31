import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String
    followings(page: Int): [User]
    followers(page: Int): [User]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    user(id: Int!): User
  }
`;

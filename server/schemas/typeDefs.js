const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
}

type Event {
  _id: ID
  eventText: String
  createdAt: String
  username: String  
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth 
    addEvent(eventText: String!): Event   
  }
`;

module.exports = typeDefs;

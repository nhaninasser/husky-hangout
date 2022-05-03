const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    events: [Event]
  }

  type Category {
    _id: ID
    name: String
  }

  type Event {
    _id: ID
    eventName: String
    eventDate: String
    eventText: String
    createdAt: String
    username: String
    attending: Int
    category: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
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
    events: [Event]
    event(_id: ID!): Event
    categories: [Category]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addEvent(eventText: String!): Event 
    addComment(commentId: ID!, commentBody: String!): Event     
  }
`;

module.exports = typeDefs;

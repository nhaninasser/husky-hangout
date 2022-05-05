import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query catergories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_EVENTS = gql`
query Events {
  events {
    _id
    eventName
    eventDate
    eventText
    createdAt
    username
    attending
    category
  }
}
`;

export const QUERY_EVENT = gql`
  query event($id: String!) {
    event(_id: $id) {
      _id
      eventName
      eventText
      createdAt
      username
      eventDate
      attending
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        eventText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
  me {
    username
    email
    events {
      eventDate
      eventText
      createdAt
    }
  }
}
`

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

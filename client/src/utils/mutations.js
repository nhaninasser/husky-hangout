import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, lastName: String! $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($eventText: String!) {
    addThought(eventText: $eventText) {
      _id
      eventText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addcomment($eventId: ID!, $commentBody: String!) {
    addReaction(eventId: $eventId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

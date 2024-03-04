import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks
    }
  }
`;

export const QUERY_ACTIVE_USER = gql`
    query activeUser {
        activeUser {
            _id
            username
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;
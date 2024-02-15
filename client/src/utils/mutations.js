import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;



export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: String!, $title: String!, $description: String!) {
    saveBook(bookId: $bookId, title: $title, description: $description) {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
  
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($id: String!) {
    removeBook(id: $id) {
      bookId
    }
  }
  
`

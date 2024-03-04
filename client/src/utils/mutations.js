import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
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
export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $title: String!, $description: String!, $authors: [String], $image: String, $link: String) {
        saveBook(bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image, link: $link) {
            savedBooks{
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                title
            }
        }
    }
`;
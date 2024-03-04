// Import necessary dependencies and components
import { useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ACTIVE_USER } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

// Define SavedBooks component
const SavedBooks = () => {
  const { loading, data, refetch } = useQuery(QUERY_ACTIVE_USER);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userData = data?.activeUser || {};

    // Effect hook to refetch data on initial render
  useEffect(() => {
    refetch(); 
  }, [refetch]);

    // Render loading message while data is loading
  if (loading) {
    return <h2>Loading Books...</h2>;
  }

  // Render message if user is not logged in
  if (!userData?.username) {
    return <h4>You must be logged in the view this page.</h4>;
  }

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({ variables: { bookId: bookId } });
      await refetch();
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };


  // Render SavedBooks component
  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            return (
              <Col key={index} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

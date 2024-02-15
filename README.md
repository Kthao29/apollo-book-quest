# apollo-book-quest

# Description

This application uses Google Books API to search for books that the user want with Apollo Client. Users have the option of signing up for an account and then logging in to add books to their list. They can also remove it when they are done.

# User Story

```

AS AN avid reader

I WANT to search for new books to read

SO THAT I can keep a list of books to purchase

```

# Acceptance Criteria

```

GIVEN a book search engine

WHEN I load the search engine

THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button

WHEN I click on the Search for Books menu option

THEN I am presented with an input field to search for books and a submit button

WHEN I am not logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site

WHEN I click on the Login/Signup menu option

THEN a modal appears on the screen with a toggle between the option to log in or sign up

WHEN the toggle is set to Signup

THEN I am presented with three inputs for a username, an email address, and a password, and a signup button

WHEN the toggle is set to Login

THEN I am presented with two inputs for an email address and a password and login button

WHEN I enter a valid email address and create a password and click on the signup button

THEN my user account is created and I am logged in to the site

WHEN I enter my account’s email address and password and click on the login button

THEN I the modal closes and I am logged in to the site

WHEN I am logged in to the site

THEN the menu options change to Search for Books, an option to see my saved books, and Logout

WHEN I am logged in and enter a search term in the input field and click the submit button

THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account

WHEN I click on the Save button on a book

THEN that book’s information is saved to my account

WHEN I click on the option to see my saved books

THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account

WHEN I click on the Remove button on a book

THEN that book is deleted from my saved books list

WHEN I click on the Logout button

THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  

```

# Screenshots

![Alt text](Screenshots/homepage.png)

![Alt text](Screenshots/searchbooks.png)

![Alt text](Screenshots/login.png)

![Alt text](Screenshots/signup.png)


# Usage/Installation

```
npm install graphql

npm install @apollo/server

npm install bcrypt

npm install express

npm install jsonwebtoken

npm install mongoose

npm install nodemon

npm install react

```

# Credits/References

```
Javascript

Nodemon

Express

Render

Concurrently

Node.js

Github

Apollo

Bootstrap

React

MongooseDB

```

# Author

Feel free to visit my Github Repository [@Kthao29](https://github.com/Kthao29)
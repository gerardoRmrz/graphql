import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";

import { SetErrorMessageCtx } from "../App";
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOKS_BY_GENRE,
} from "../graphql/queries";

const NewBook = () => {
  const setErrorMessage = useContext(SetErrorMessageCtx);
  const currentUser = JSON.parse(localStorage.getItem("books-currentUser"));

  const currentUserGenre = currentUser.favoriteGenre;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      {
        query: BOOKS_BY_GENRE,
        variables: {
          genre: currentUserGenre,
        },
      },
      {
        query: ALL_AUTHORS,
      },
    ],
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, (allBooks) => {
        if (!allBooks) {
          return allBooks;
        }
        return {
          allBooks: allBooks.allBooks.concat(response?.data.addBook),
        };
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: { title, author, published, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            genre
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

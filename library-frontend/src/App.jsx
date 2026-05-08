import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

import { ALL_AUTHORS, ALL_BOOKS } from "./graphql/queries";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);

  const logout = () => {
    localStorage.removeItem("books-user-token");
    setToken(null);
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => setPage("add")}>add book</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Notify message={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={allAuthors.data?.allAuthors}
        isLogged={token ? true : false}
      />

      <Books show={page === "books"} books={allBooks.data?.allBooks} />

      <NewBook show={page === "add" && token} />

      <Recommend
        show={page === "recommend" && token}
        books={allBooks.data?.allBooks}
      />

      <LoginForm
        show={page === "login"}
        setError={setErrorMessage}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;

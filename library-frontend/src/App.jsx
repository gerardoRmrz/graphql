import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER } from "./graphql/queries";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  const [getCurrentUser, currentUserData] = useLazyQuery(CURRENT_USER);

  if (currentUserData.data) {
    localStorage.setItem(
      "books-currentUser",
      JSON.stringify(currentUserData.data),
    );
  }

  const logout = () => {
    setToken(null);
    setPage("authors");
    localStorage.removeItem("books-user-token");
    localStorage.removeItem("books-currentUser");
    client.clearStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("recommend")}>recommend</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify message={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={allAuthors.data?.allAuthors}
        isLogged={token ? true : false}
      />

      <Books show={page === "books"} books={allBooks.data?.allBooks} />

      <NewBook show={page === "add" && token} setError={setErrorMessage} />

      <Recommend show={page === "recommend" && token} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        getCurrentUser={getCurrentUser}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;

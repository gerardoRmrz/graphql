import { useState, useContext } from "react";
import { ErrorMessageProvider } from "../context/ErrorMessageContext";
import { UserContext, UserProvider } from "../context/UserContext";

import Heading from "./Heading";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

const App = () => {
  const { currentUser, token } = useContext(UserContext);

  const [page, setPage] = useState("authors");

  return (
    <ErrorMessageProvider>
      <Heading setPage={setPage} />

      <Notify />

      {page === "authors" ? <Authors isLogged={token ? true : false} /> : null}

      {page === "books" ? <Books /> : null}

      {page === "add" && token ? <NewBook /> : null}

      {page === "recommend" && token ? (
        <Recommend currentUserGenre={currentUser.favoriteGenre} />
      ) : null}

      {page === "login" ? <LoginForm setPage={setPage} /> : null}
    </ErrorMessageProvider>
  );
};

export default App;

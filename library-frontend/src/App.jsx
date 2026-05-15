import { useState, createContext } from "react";

import Heading from "./Heading";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("books-currentUser")),
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");

  return (
    <SetErrorMessageCtx.Provider value={setErrorMessage}>
      <div>
        <Heading
          setToken={setToken}
          setPage={setPage}
          setCurrentUser={setCurrentUser}
          token={token}
          currentUser={currentUser}
        />

        <Notify message={errorMessage} />

        {page === "authors" ? (
          <Authors isLogged={token ? true : false} />
        ) : null}

        {page === "books" ? <Books /> : null}

        {page === "add" && token ? <NewBook /> : null}

        {page === "recommend" && token ? (
          <Recommend currentUserGenre={currentUser.favoriteGenre} />
        ) : null}

        {page === "login" ? (
          <LoginForm
            setToken={setToken}
            setCurrentUser={setCurrentUser}
            setPage={setPage}
          />
        ) : null}
      </div>
    </SetErrorMessageCtx.Provider>
  );
};

export const SetErrorMessageCtx = createContext(null);
export default App;

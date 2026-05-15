import { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";

import Heading from "./components/Heading";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

const App = () => {
  const { token } = useContext(UserContext);

  const [page, setPage] = useState("authors");

  return (
    <>
      <Heading setPage={setPage} />

      <Notify />

      {page === "authors" ? <Authors /> : null}

      {page === "books" ? <Books /> : null}

      {page === "add" && token ? <NewBook /> : null}

      {page === "recommend" && token ? <Recommend /> : null}

      {page === "login" ? <LoginForm setPage={setPage} /> : null}
    </>
  );
};

export default App;

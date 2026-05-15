import { useApolloClient } from "@apollo/client/react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Heading = ({ setPage }) => {
  const client = useApolloClient();
  const { currentUser, setCurrentUser, token, setToken } =
    useContext(UserContext);

  const logout = () => {
    setToken(null);
    setPage("authors");
    setCurrentUser(null);
    localStorage.removeItem("books-user-token");
    localStorage.removeItem("books-currentUser");
    client.clearStore();
  };

  return (
    <div>
      {token && currentUser ? (
        <>
          <span id="greeting">Welcome {currentUser.username}</span> <br></br>
        </>
      ) : null}
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      {token ? (
        <button
          onClick={() => {
            setPage("recommend");
          }}
        >
          recommend
        </button>
      ) : null}
      {token ? <button onClick={() => setPage("add")}>add book</button> : null}
      {token ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={() => setPage("login")}>login</button>
      )}
    </div>
  );
};

export default Heading;

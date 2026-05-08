import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/queries";

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("books-user-token", token);
      setPage("authors");
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  if (!show) {
    return null;
  }
  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setPassword("");
    setUsername("");
  };

  return (
    <>
      <form onSubmit={submit}>
        username{" "}
        <input
          type="text"
          value={username}
          autoComplete="username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        password{" "}
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;

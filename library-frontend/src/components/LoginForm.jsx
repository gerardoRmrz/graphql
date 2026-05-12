import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/queries";
import { CURRENT_USER } from "../graphql/queries";

const LoginForm = ({
  show,
  setToken,
  setPage,
  getCurrentUser,
  setErrorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("books-user-token", token);
      setPage("authors");
      getCurrentUser();
    },
    onError: (error) => {
      console.log(error);
      setErrorMessage("login failed: ");
      const setTimeError = setTimeout(() => {
        setErrorMessage("");
      }, 10000);
      setTimeError.clear();
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
    getCurrentUser();
  };

  return (
    <>
      <form onSubmit={submit}>
        <label>
          username{" "}
          <input
            type="text"
            value={username}
            autoComplete="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </label>
        <label>
          password{" "}
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </label>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;

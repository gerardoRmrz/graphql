import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { SetErrorMessageCtx } from "../App";
import { LOGIN } from "../graphql/queries";

const LoginForm = ({ setToken, setCurrentUser, setPage }) => {
  const setErrorMessage = useContext(SetErrorMessageCtx);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { _, loading, __ }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      const currentUser = JSON.stringify(data.login.userInfo);

      setToken(token);
      setCurrentUser(JSON.parse(currentUser));
      setPage("authors");

      localStorage.setItem("books-user-token", token);
      localStorage.setItem("books-currentUser", currentUser);
    },
    onError: (error) => {
      setPage("authors");
      console.log(error);
      setErrorMessage("login failed: ");
      const setTimeError = setTimeout(() => {
        setErrorMessage("");
      }, 10000);
      setTimeError.clear();
    },
  });

  if (loading) return <p>Login...</p>;

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setPassword("");
    setUsername("");
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

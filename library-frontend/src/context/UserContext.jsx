import { createContext, useState } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("books-user-token"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("books-currentUser")),
  );

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

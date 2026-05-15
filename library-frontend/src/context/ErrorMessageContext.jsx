import { createContext, useState } from "react";

const ErrorMessageContext = createContext(null);

function ErrorMessageProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorMessageContext.Provider>
  );
}

export { ErrorMessageProvider, ErrorMessageContext };

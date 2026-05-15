import { useQuery } from "@apollo/client/react";
import { useContext } from "react";

import { ErrorMessageContext } from "../context/ErrorMessageContext";
import { UserContext } from "../context/UserContext";
import { ALL_AUTHORS } from "../graphql/queries";
import SetBornToForm from "./SetBornToForm";

const Authors = () => {
  const { setErrorMessage } = useContext(ErrorMessageContext);
  const { token } = useContext(UserContext);
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    setErrorMessage(error.message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          paddingTop: "60px",
          marginLeft: "20px",
          width: "25%",
        }}
      >
        {token ? (
          <SetBornToForm authors={data.allAuthors.map((a) => a.name)} />
        ) : null}
      </div>
    </div>
  );
};

export default Authors;

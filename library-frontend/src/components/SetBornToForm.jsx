import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";

import { ErrorMessageContext } from "../context/ErrorMessageContext";
import { ADD_BIRTH_YEAR, ALL_AUTHORS } from "../graphql/queries";

const SetBornToForm = ({ authors }) => {
  const { setErrorMessage } = useContext(ErrorMessageContext);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [addBornYear, { _, loading, __ }] = useMutation(ADD_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    },
  });

  if (loading) return <p>Loading...</p>;

  const submit = (event) => {
    event.preventDefault();
    addBornYear({ variables: { name: name, setBornTo: born } });
    setName("");
    setBorn("");
  };

  const authorsList = authors ? authors : [];

  return (
    <>
      <h2>Set birth year</h2>
      <form
        onSubmit={(event) => submit(event)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
          marginTop: "10px",
        }}
      >
        <label>
          name
          <select
            onChange={({ target }) => setName(target.value)}
            value={name}
            name="name"
          >
            {authorsList.map((a, index) => (
              <option key={index}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          born
          <input
            style={{ width: "150px" }}
            type="number"
            onChange={({ target }) => setBorn(Number(target.value))}
            value={born}
          ></input>
        </label>
        <button type="submit" style={{ width: "150px" }}>
          update author
        </button>
      </form>
    </>
  );
};

export default SetBornToForm;

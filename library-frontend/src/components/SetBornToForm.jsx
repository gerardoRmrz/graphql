import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_BIRTH_YEAR, ALL_AUTHORS } from "../graphql/queries";

const SetBornToForm = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [addBornYear] = useMutation(ADD_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const submit = (event) => {
    event.preventDefault();
    addBornYear({ variables: { name: name, setBornTo: born } });
    setName("");
    setBorn("");
  };

  const authorsList = props?.authors;

  return (
    <>
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
          <select onChange={({ target }) => setName(target.value)} value={name}>
            <option value="" disabled selected hidden>
              Select an option...
            </option>
            {authorsList.map((a, index) => (
              <option key={index}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          born
          <input
            type="number"
            onChange={({ target }) => setBorn(Number(target.value))}
            value={born}
          ></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default SetBornToForm;

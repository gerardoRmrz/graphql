import SetBornToForm from "./SetBornToForm";
const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const authors = props.authors ? props.authors : [];
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
            {authors.map((a) => (
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
        {props.isLogged ? (
          <SetBornToForm authors={authors.map((a) => a.name)} />
        ) : null}
      </div>
    </div>
  );
};

export default Authors;

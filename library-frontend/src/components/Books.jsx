import { useState } from "react";

const Books = (props) => {
  const [useGenre, setUseGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  const books = props.books ? props.books : [];
  const uniqueGenres = getUniqueGenres(books);
  const filteredBooks = filterByGenre(books, useGenre);

  const setGenre = (e) => {
    setUseGenre(e.target.innerText);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "60%" }}>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
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
        {uniqueGenres.map((g) => (
          <button
            key={g}
            onClick={setGenre}
            style={{ margin: "5px", fontSize: "20px" }}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;

const getUniqueGenres = (booksArr) => {
  const genresArr = booksArr.map((b) => b.genres);
  return [
    ...new Set(genresArr.reduce((acc, curr) => acc.concat(curr), [])),
    "all genres",
  ];
};

const filterByGenre = (books, genre) => {
  console.log(genre);
  if (genre === "all genres") {
    return books;
  }
  const result = books.filter((b) => b.genres.includes(genre));
  return result;
};

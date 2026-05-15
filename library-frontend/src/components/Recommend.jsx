import { useContext } from "react";
import { useQuery } from "@apollo/client/react";

import { SetErrorMessageCtx } from "../App";
import { BOOKS_BY_GENRE } from "../graphql/queries";

const Recommend = ({ currentUserGenre }) => {
  const setErrorMessage = useContext(SetErrorMessageCtx);
  /* const filteredBooks = books.filter((b) =>
    b.genres.includes(currentUser.data.me.favoriteGenre),
  ) */

  const { loading, error, data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: currentUserGenre },
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    if (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }

  const bookList = data.allBooks;

  return (
    <>
      <h2>recommendations</h2>
      <h3>
        books in your favorite genre <strong>{currentUserGenre}</strong>
      </h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommend;

import { useQuery } from "@apollo/client/react";
import { CURRENT_USER, BOOKS_BY_GENRE, ALL_BOOKS } from "../graphql/queries";

const Recommend = ({ show }) => {
  const currentUser = JSON.parse(localStorage.getItem("books-currentUser"));

  const filteredBooksGQL = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: currentUser?.me.favoriteGenre },
  });

  const filteredBooks = filteredBooksGQL.data?.allBooks;

  /* const filteredBooks = books.filter((b) =>
    b.genres.includes(currentUser.data.me.favoriteGenre),
  ) */

  if (!show) {
    return null;
  }
  return (
    <>
      <h2>recommendations</h2>
      <h3>
        books in your favorite genre{" "}
        <strong>{currentUser?.me.favoriteGenre}</strong>
      </h3>
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
    </>
  );
};

export default Recommend;

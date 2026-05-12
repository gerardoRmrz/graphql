import { useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "../graphql/queries";

const Recommend = ({ show, books }) => {
  const currentUser = useQuery(CURRENT_USER);
  const filteredBooks = books.filter((b) =>
    b.genres.includes(currentUser.data.me.favoriteGenre),
  );

  if (!show) {
    return null;
  }
  return (
    <>
      <h2>recommendations</h2>
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

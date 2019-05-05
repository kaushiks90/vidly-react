import React from "react";
import Like from "./common/Like";
const MoviesTable = props => {
  const { onSort, onLike, onDelete, movies } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>NumberInStock</th>
          <th onClick={() => onSort("dailyRentalRate")}>DailyRentalRate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onClick={() => onLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;

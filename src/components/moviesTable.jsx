import React, { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Name" },
    { path: "numberInStock", label: "NumberInStock" },
    { path: "dailyRentalRate", label: "DailyRentalRate" },
    { path: "1", label: " " },
    { path: "2", label: " " }
  ];
  render() {
    const { onSort, onLike, onDelete, movies, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          data={movies}
        />

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
  }
}

export default MoviesTable;

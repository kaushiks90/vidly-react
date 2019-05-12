import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/Like";
import Table from "./common/table";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    },
    { path: "genre.name", label: "Name" },
    { path: "numberInStock", label: "NumberInStock" },
    { path: "dailyRentalRate", label: "DailyRentalRate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { onSort, movies, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

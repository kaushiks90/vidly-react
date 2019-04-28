import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";

class Movies extends Component {
  state = {
    movies: getMovies()
  };
  handleDelete(movie) {
    let newMovies = [...this.state.movies];
    newMovies = newMovies.filter(x => x._id !== movie._id);
    this.setState({ movies: newMovies });
  }
  handleLike(movie) {
    movie.liked = !movie.liked;
    let newMovies = [...this.state.movies];
    let index = newMovies.indexOf(movie);
    newMovies[index] = movie;
    this.setState({ movies: newMovies });
  }
  render() {
    const { length: count } = this.state.movies;
    if (this.state.movies.length === 0) return <p>There are {count} movies </p>;
    return (
      <React.Fragment>
        <p>There are {count} number of movies </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>NumberInStock</th>
              <th>DailyRentalRate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </React.Fragment>
    );
  }
}

export default Movies;

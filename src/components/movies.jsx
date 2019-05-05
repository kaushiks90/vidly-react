import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    genreSelected: "",
    currentPage: 1,
    pageSize: 4
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
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
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreChange = genre => {
    this.setState({ genreSelected: genre, currentPage: 1 });
  };
  render() {
    const {
      pageSize,
      currentPage,
      genreSelected,
      movies: allMovies
    } = this.state;

    const filtered =
      genreSelected && genreSelected._id
        ? allMovies.filter(movies => movies.genre._id === genreSelected._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);
    const count = filtered.length;
    if (count === 0) return <p>There are {count} movies </p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selected={this.state.genreSelected}
              onGenreChange={this.handleGenreChange}
            />
          </div>

          <div className="col">
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
                {movies.map(movie => (
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
            <Pagination
              items={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;

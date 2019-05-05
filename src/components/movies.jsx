import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    genreSelected: "",
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
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
  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };
  render() {
    const {
      pageSize,
      currentPage,
      genreSelected,
      sortColumn,
      movies: allMovies
    } = this.state;

    const filtered =
      genreSelected && genreSelected._id
        ? allMovies.filter(movies => movies.genre._id === genreSelected._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
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
            <MoviesTable
              onSort={this.handleSort}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              movies={movies}
            />
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

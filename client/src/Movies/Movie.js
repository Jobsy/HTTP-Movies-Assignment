import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  editMovie = (id, updateMovie) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  putMovie = () => {
    this.editMovie(4, {
      id: 1,
      title: "Jobsyttttt",
      director: "Bailus",
      metascore: 100,
      stars: ["Tee", "Bossy", "Sammy"]
    })

    console.log("working")
  };


  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="save-button2" onClick={this.putMovie} >
          Edit/Update
        </div>
        <PutMovieForm editMovie={this.editMovie} />
      </div>
    );
  }
}



class PutMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {
        id: 1,
        title: "Jobsy77777]]]",
        director: "Bailus",
        metascore: 100,
        stars: ["Tee", "Bossy", "Sammy"]
      }
    };
  }

  handleChange = e => {
    this.setState({
      movies: {
        ...this.state.movies,
        [e.target.name]: e.target.value
      }
    });
  };

  // putMessage = e => {
  //   e.preventDefault();
  //   // invoke this.props.putMessage here once it is written and passed in
  //   // then pass in the movie quote that is on state as an argument
  //   this.props.putMessage("72", this.state.movies);
  // };
  putMessage = e => {
    e.preventDefault();
    // invoke this.props.putMessage here once it is written and passed in
    // then pass in the movie quote that is on state as an argument
    this.props.editMovie("3", this.state.movies);
  };

  render() {
    return (
      <div className="quotes-form">
        <h2>PUT (update) a quote</h2>
        <form onSubmit={this.putMessage}>
        <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={this.handleChange}
          value={this.state.movies.id}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
          value={this.state.movies.title}
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            onChange={this.handleChange}
          value={this.state.movies.director}
          />
          <input
            type="text"
            name="metascore"
            placeholder="Metascore"
            onChange={this.handleChange}
          value={this.state.movies.metascore}
          />
          <input
            type="text"
            name="stars"
            placeholder="Stars"
            onChange={this.handleChange}
          value={this.state.movies.stars}
          />
          {/* {this.props.putError ? (
            <ErrorMessage message={this.props.putError} />
          ) : null}
          {this.props.putSuccessMessage ? (
            <SuccessMessage message={this.props.putSuccessMessage} />
          ) : null} */}
          <button className="quotes-btn" type="submit">
            PUT quote
          </button>
        </form>
      </div>
    );
  }
}

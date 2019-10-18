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
      .then(res => {
        this.setState({ movie: res.data })
        // localStorage.setItem("key", this.setState({ movie: res.data }))
      })
      .catch(err => console.log(err.response));
  };

  editMovie = (id, updateMovie) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      // .then(res => console.log(res))
      .then(res => this.setState({ movie: res.data }))
      // .then(res => {
      //   localStorage.getItem("key", this.setState({ movie: res.data }))
      // })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    // console.log(">>>>: ", id)
    axios
    .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(res => console.log("???: ", res))
    .then(res => this.setState({ movie: res.data }))
   
    .catch(err => console.log(err.response));
    console.log("working")
  };

   render() {
    console.log("ssss: ", this.state)

    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={this.putMovie} >
          Edit/Update
        </div>
        <div className="delete-button" onClick={this.deleteMovie} >
          Delete
        </div>
        <PutMovieForm editMovie={this.editMovie} state={this.state} />
      </div>
    );
  }
}



class PutMovieForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(";;;;;: ", props)
   
    this.state = this.props.state
  }

  handleChange = e => {
    this.setState({
      movie: {
        ...this.state.movie,
        [e.target.name]: e.target.value
      }
    });
  };

  putMessage = e => {
    e.preventDefault();
    this.props.editMovie(this.state.id, this.state.movie);
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
            value={this.state.movie.id}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
            value={this.state.movie.title}
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            onChange={this.handleChange}
            value={this.state.movie.director}
          />
          <input
            type="text"
            name="metascore"
            placeholder="Metascore"
            onChange={this.handleChange}
            value={this.state.movie.metascore}
          />
          <input
            type="text"
            name="stars"
            placeholder="Stars"
            onChange={this.handleChange}
            value={this.props.state.movie.stars}
          />
         
          <button className="quotes-btn" type="submit">
            PUT quote
          </button>
        </form>
      </div>
    );
  }
}

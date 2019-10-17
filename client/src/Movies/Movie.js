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
      id: 5,
      title: "Jobsy",
      director: "Bailus",
      metascore: 100,
      stars: ["Tee", "Bossy", "Sammy"]
    })
    console.log("working");
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
        <div className="save-button2" onClick={this.putMovie}>
          Edit/Update
        </div>
      </div>
    );
  }
}
// editMovie(4, {
//   id: 5,
// title: "Jobsy",
// director: "Bailus",
// metascore: 100,
// stars: ["Tee", "Bossy", "Sammy"]
// })
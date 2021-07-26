import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor(){ //creates component/class; good place to initialize values
    super(); //calls parent class React.Component
    this.state = { //refers to the MainView class instance created in memory
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  //When a movie is clicked, this function is invoked and updates the state of the selectedMovie property to that movie
  setSelectedMovie(newSelectedMovie){
    this.setState({selectedMovie: newSelectedMovie});
  }

  //When a user successfully logs in, this function updates the user property in state to that particular user
  onLoggedIn(user){
    this.setState({user});
  }

  render(){
    const {movies, selectedMovie, user} = this.state; //object destruction; equivalent to const movies = this.state.movies;
    //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if(!user) return <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>;
    if(movies.length === 0) return <div className = "main-view"/> //curly braces required only for multiple statements, optional for single statement; else statement omitted
    return (
      <Container>
        <div className = "main-view">
          {selectedMovie
            ? (
              <Row className = "justify-content-md-center">
                <Col md = {8}>
                  <MovieView movie = {selectedMovie} onBackClick = {newSelectedMovie => this.setSelectedMovie(newSelectedMovie)}/>
                </Col>
              </Row>
            )
            //map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon
            : (
              <Row className = "justify-content-md-center">
                {movies.map(movie => 
                  <Col md = {3}>
                    <MovieCard key = {movie._id} movieData = {movie} onMovieClick = {movie => this.setSelectedMovie(movie)}/>
                  </Col>
                )}
              </Row>
            )
          }
        </div>
      </Container>
    );
  }

  componentDidMount(){
    axios.get('https://jny-myflix.herokuapp.com/movies').then(response => {
      this.setState({movies: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}
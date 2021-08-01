import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';

import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view'
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

  getMovies(token){
    axios.get('https://jny-myflix.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
      //assign the result to the state 
      this.setState({
        movies: response.data
      });
    }).catch(function(error){
      console.log(error);
    });
  }

  //When a user successfully logs in, this function updates the user property in state to that particular user
  onLoggedIn(authData){
    console.log(authData);
    this.setState({user: authData.user.Username});
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render(){
    const {movies, user} = this.state; //object destruction; equivalent to const movies = this.state.movies;
    // if(!user) return <RegistrationView onLoggedIn = {user => this.onLoggedIn(user)}/>;
    return (
      <Router>
        <Container>
          <Row>
            <Col md = {8}>
              <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
            </Col>
          </Row>
          <Row className = "main-view justify-content-md-center"> 
            <Route exact path = "/" render = {() => {
              //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/> //curly braces required only for multiple statements, optional for single statement
              //map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon
              return movies.map(movie => (
                <Col lg = {3} md = {4} sm = {12} key = {movie._id}>
                  <MovieCard movieData = {movie}/>
                </Col>
              ))
            }}/>
            <Route exact path = "/register" render = {() => { 
              return <Col>
                <RegistrationView/>
              </Col>
            }}/>
            <Route exact path = "movies/:movieId" render = {({match, history}) => { //match is the url 
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
              return <Col md = {8}>
                <MovieView movie = {movies.find(m => m._id === match.params.movieId)} onBackClick = {() => {history.goBack()}}/>
              </Col>
            }}/>
            <Route exact path = "/genres/:name" render = {({match, history}) => { //match is the url
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
              return <Col md = {8}>
                <GenreView genre = {movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick = {() => {history.goBack()}}/>
              </Col>
            }}/>
            <Route exact path = "/directors/:name" render = {({match, history}) => { //match is the url
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
              return <Col md = {8}>
                <DirectorView director = {movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick = {() => {history.goBack()}}/>
              </Col>
            }}/>
          </Row>
        </Container>
      </Router>
    );
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
}
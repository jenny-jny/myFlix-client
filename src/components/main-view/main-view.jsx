import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';

import {RegistrationView} from '../registration-view/registration-view'
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';

export class MainView extends React.Component{
  constructor(){ //creates component/class; good place to initialize values
    super(); //calls parent class React.Component
    this.state = { //refers to the MainView class instance created in memory
      movies: [],
      user: null
    };
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

  onRegistered(authData){
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
    return (
      <Router>
        <Container>
          <Row className = "main-view justify-content-md-center"> 
            <Route exact path = "/register" render = {() => { 
              //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if(!user) return <Col>
                  <RegistrationView onRegistered = {user => this.onRegistered(user)}/>
                </Col>
                return <Redirect to = '/movies'/>
            }}/>
            <Route exact path = "/login" render = {() => {
              //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if(!user) return <Col>
                  <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
                </Col>
                return <Redirect to = '/movies'/>
            }}/>
            <Route exact path = "/movies" render = {() => {
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/> //curly braces required only for multiple statements, optional for single statement
                return <React.Fragment>
                  <Row className = "justify-content-md-right">
                    <span>
                      <Link to = {`/users/${user}`}>
                        <Button>Profile</Button>
                      </Link>
                    </span>
                    <span>
                      <Col md = {8}>
                        <Link to = {`/login`}>
                          <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
                        </Link>
                      </Col>
                    </span>
                  </Row>
                  {/* map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon */}
                  {movies.map(movie => ( 
                    <Col lg = {3} md = {4} sm = {12} key = {movie._id}>
                      <MovieCard movieData = {movie} simple2 = {true}/>
                    </Col>
                  ))}
                </React.Fragment>
            }}/>
            <Route exact path = "/movies/:movieId" render = {({match, history}) => { //match is the url 
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
                return <React.Fragment>
                  <Col md = {8}>
                    <MovieView movie = {movies.find(m => m._id === match.params.movieId)} onBackClick = {() => {history.goBack()}}/>
                  </Col>
                  <Row className = "justify-content-md-right">
                    <span>
                      <Link to = {`/users/${user}`}>
                        <Button>Profile</Button>
                      </Link>
                    </span>
                    <span>
                      <Col md = {8}>
                        <Link to = {`/login`}>
                          <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
                        </Link>
                      </Col>
                    </span>
                  </Row>
                </React.Fragment>
            }}/>
            <Route exact path = "/movies/:Title/genre/:Name" render = {({match, history}) => { //match is the url
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
                return <React.Fragment>
                  <Col md = {8}>
                    <GenreView moviesData = {movies} genre = {movies.find(movie => movie.Genre.Name === match.params.Name).Genre} onBackClick = {() => {history.goBack()}}/>
                  </Col>
                  <Row className = "justify-content-md-right">
                    <span>
                      <Link to = '/movies'>
                        <Button variant = "link">All Movies</Button>
                      </Link>
                    </span>
                    <span>
                      <Link to = {`/users/${user}`}>
                        <Button>Profile</Button>
                      </Link>
                    </span>                    
                    <span>
                      <Col md = {8}>
                        <Link to = {`/login`}>
                          <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
                        </Link>
                      </Col>
                    </span>
                  </Row>
                </React.Fragment>
            }}/>
            <Route exact path = "/movies/:Title/director/:Name" render = {({match, history}) => { //match is the url
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              if(movies.length === 0) return <div className = "main-view"/>;
                return <React.Fragment>
                  <Col md = {8}>
                    <DirectorView moviesData = {movies} director = {movies.find(movie => movie.Director.Name === match.params.Name).Director} onBackClick = {() => {history.goBack()}}/>
                  </Col>
                  <Row className = "justify-content-md-right">
                    <span>
                      <Link to = '/movies'>
                        <Button variant = "link">All Movies</Button>
                      </Link>
                    </span>
                    <span>
                      <Link to = {`/users/${user}`}>
                        <Button>Profile</Button>
                      </Link>
                    </span>                    
                    <span>
                      <Col md = {8}>
                        <Link to = {`/login`}>
                          <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
                        </Link>
                      </Col>
                    </span>
                  </Row>
                </React.Fragment>
            }}/>
            <Route exact path= "/users/:Username" render = {({history}) => {
              if(!user) return <Col>
                <LoginView onLoggedIn = {user => this.onLoggedIn(user)}/>
              </Col>
              return <React.Fragment>
              <Col md = {8}>
                <ProfileView moviesData = {movies} user = {user} onBackClick = {() => {history.goBack()}}/>
              </Col>
              <Row className = "justify-content-md-right">
                <span>
                  <Link to = '/movies'>
                    <Button variant = "link">All Movies</Button>
                  </Link>
                </span>
                <span>
                  <Col md = {8}>
                    <Link to = {`/login`}>
                      <Button onClick = {() => this.onLoggedOut()}>Logout</Button>
                    </Link>
                  </Col>
                </span>
              </Row>
            </React.Fragment>           
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
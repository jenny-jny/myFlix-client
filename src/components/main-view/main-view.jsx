import React, {useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';

//#0
import {setMovies, setUser} from '../../actions/actions';

// #1 The rest of components import statements but without the MovieCard because it will be imported and used in the MoviesList component rather than in here. 
import {RegistrationView} from '../registration-view/registration-view'
import {LoginView} from '../login-view/login-view';
import MoviesList from './movies-list/movies-list';
import {MovieView} from '../movie-view/movie-view';
import {GenreView} from '../movie-view/genre-view/genre-view';
import {DirectorView} from '../movie-view/director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';

// #2 export keyword removed from here
function MainView(props){
  // constructor(){ //creates component/class; good place to initialize values
  //   super(); //calls parent class React.Component
  //   this.state = { //refers to the MainView class instance created in memory
  //     // #3 movies and user states removed from here
  //     movies: [],
  //     user: null
  //   };
  // }
  
  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      props.setUser(localStorage.getItem('user'));
      getMovies(accessToken);
    }
  }, [])

  // #5 movies and user are extracted from props rather than from the this.state
  let {movies, user} = props; //object destruction; equivalent to const movies = this.state.movies;

  const getMovies = token => {
    axios.get('https://jny-myflix.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
      //assign the result to the state 
      // #4
      // this.setState({
      //   movies: response.data
      // });
      props.setMovies(response.data);
    }).catch(function(error){
      console.log(error);
    });
  };

  //When a user successfully logs in, this function updates the user property in state to that particular user
  const onLoggedIn = authData => {
    console.log(authData);
    //this.setState({user: authData.user.Username});
    props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    getMovies(authData.token);
  };

  const onRegistered = authData => {
    console.log(authData);
    //this.setState({user: authData.user.Username});
    props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    getMovies(authData.token);
  };

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // this.setState({
    //   user: null
    // });
    props.setUser('');
  };

  return (
    <Router>
      <Container>
        <Row className = "main-view justify-content-md-center"> 
          <Route exact path = '/' render = {() => {
            if (!user || user.length === 0) 
              return ( 
                <>
                  <Col>
                    <LoginView onLoggedIn = {(user) => onLoggedIn(user)} />
                  </Col>
                  <Link to = {`/register`}>
                    <Button>Register</Button>
                  </Link> 
                </>
              );
              return <Redirect to = '/movies'/>;
            }}/>
          <Route exact path = "/register" render = {() => { 
            //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
            if(!user || user.length === 0) return (
              <>
                <Col>
                  <RegistrationView onRegistered = {user => onRegistered(user)}/>
                </Col>
                <Link to = {`/login`}>
                  <Button>Login</Button>
                </Link>
              </>
              );
              return <Redirect to = '/movies'/>;
              }}/>
          <Route exact path = "/login" render = {() => {
            //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
            if(!user || user.length === 0) return (
              <>
                <Col>
                  <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
                </Col>
                <Link to = {`/register`}>
                  <Button>Register</Button>
                </Link>        
              </>
              );        
              return <Redirect to = '/movies'/>;
              }}/>
          <Route exact path = "/movies" render = {() => {
            if(!user || user.length === 0) return <Col>
              <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
            </Col>
            if(movies.length === 0) return <div className = "main-view"/> //curly braces required only for multiple statements, optional for single statement
              return <React.Fragment>
                <Row className = "justify-content-md-left">
                  <Col md = {8}>
                    <div className = "greeting">
                      <span className = "label">Hello, </span>
                      <span className = "value">{user}</span>
                    </div>
                  </Col>
                </Row>
                <Row className = "justify-content-md-right">
                  <span>
                    <Link to = {`/users/${user}`}>
                      <Button>Profile</Button>
                    </Link>
                  </span>
                  <span>
                    <Col md = {8}>
                      <Link to = {`/login`}>
                        <Button onClick = {() => onLoggedOut()}>Logout</Button>
                      </Link>
                    </Col>
                  </span>
                </Row>
                {/* #6 */}
                <MoviesList movies = {movies}/>;
              </React.Fragment>
            }}/>
          <Route exact path = "/movies/:movieId" render = {({match, history}) => { //match is the url 
            if(!user || user.length === 0) return <Col>
              <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
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
                        <Button onClick = {() => onLoggedOut()}>Logout</Button>
                      </Link>
                    </Col>
                  </span>
                </Row>
              </React.Fragment>
          }}/>
          <Route exact path = "/movies/:Title/genre/:Name" render = {({match, history}) => { //match is the url
            if(!user || user.length === 0) return <Col>
              <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
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
                        <Button onClick = {() => onLoggedOut()}>Logout</Button>
                      </Link>
                    </Col>
                  </span>
                </Row>
              </React.Fragment>
          }}/>
          <Route exact path = "/movies/:Title/director/:Name" render = {({match, history}) => { //match is the url
            if(!user || user.length === 0) return <Col>
              <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
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
                        <Button onClick = {() => onLoggedOut()}>Logout</Button>
                      </Link>
                    </Col>
                  </span>
                </Row>
              </React.Fragment>
          }}/>
          <Route exact path= "/users/:Username" render = {({history}) => {
            if(!user || user.length === 0) return <Col>
              <LoginView onLoggedIn = {user => onLoggedIn(user)}/>
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
                    <Button onClick = {() => onLoggedOut()}>Logout</Button>
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

//#7 gets state from the store 
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  };
}

const mapDispatchToProps = {
  setMovies,
  setUser
};

//connect component within application to the store
export default connect(mapStateToProps, mapDispatchToProps)(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired, 
    Title: PropTypes.string.isRequired, 
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequire
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  user: PropTypes.string.isRequired,
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};
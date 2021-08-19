import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {MovieCard} from '../movie-card/movie-card';

export function ProfileView(props){
  //useState() returns a stateful value and a function to update it
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [validated, setValidated] = useState(false);
  const favoriteMoviesList = props.moviesData.filter(movie => {
    return favoriteMovies.includes(movie._id);
  });
  
  const handleUpdate = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      //??????????????????????????????????????????????????????????
    }
    console.log(username, password, email, birthday);
    //send a request to the server for authentication
    setValidated(true);
    console.log(`Bearer ${localStorage.getItem('token')}`);
    axios.put(`http://jny-myflix.herokuapp.com/users/${props.user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      const data = response.data;
      console.log(data);
      //THEN call props.onLoggedIn(username)
      // props.onRegistered(data);
    }).catch(() => {
      console.log('error updating the user');
    });
  };

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    if (!username) return;
    axios.get(`https://jny-myflix.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      // console.log(response.data);
      // console.log(favoriteMovies);
      //assign the result to the state 
      setUsername(response.data.Username);
      setPassword(response.data.Password);
      setEmail(response.data.Email);
      setBirthday(response.data.Birthday);
      setFavoriteMovies(response.data.FavoriteMovies);
    }).catch(function(error){
      console.log(error);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col md = {8}>
          <Button onClick = {() => props.onBackClick()}>Back</Button>
        </Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <Form noValidate validated = {validated} onSubmit = {handleUpdate}>
            <Form.Group controlId = "formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type = "text" isInvalid = {/[^0-9a-zA-Z]/.test(username) || username.length < 5} onChange = {e => setUsername(e.target.value)}/>
              <Form.Control.Feedback type = "invalid">Please enter a username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId = "formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type = "password" onChange = {e => setPassword(e.target.value)}/>
              <Form.Control.Feedback type = "invalid">Please enter a password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId = "formEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type = "email" isInvalid = {email.indexOf('.') === -1} onChange = {e => setEmail(e.target.value)}/>
              <Form.Control.Feedback type = "invalid">Please enter a email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId = "formBirthday">
              <Form.Label>Birthday: </Form.Label>
              <Form.Control type = "date" onChange = {e => setBirthday(e.target.value)}/>
              <Form.Control.Feedback type = "invalid">Please enter a birthday</Form.Control.Feedback>
            </Form.Group>
            <Button variant = "primary" type = "submit">Update</Button>
          </Form>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <Row className = "favorite-movies">
            <Col md = {8} className = "label">My favorite movies</Col>
          </Row>
          <Row className = "justify-content-md-left">
            {favoriteMoviesList.length > 0 && favoriteMoviesList.map(favoriteMovie => {
              return (
                <Col lg = {4} md = {6} sm = {12} key = {favoriteMovie._id}>
                  <MovieCard movieData = {favoriteMovie} simple = {true}/>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

// ProfileView.propTypes = {
  // moviesData: PropTypes.shape({
  //   ImagePath: PropTypes.string.isRequired, 
  //   Title: PropTypes.string.isRequired, 
  //   Description: PropTypes.string.isRequired,
  //   Genre: PropTypes.shape({
  //     Name: PropTypes.string.isRequired
  //   }).isRequired,
  //   Director: PropTypes.shape({
  //     Name: PropTypes.string.isRequired
  //   }).isRequired
  // }).isRequired,
  // user: PropTypes.shape({
  //   Username: PropTypes.string.isRequired,
  //   Password: PropTypes.string.isRequired,
  //   Email: PropTypes.string.isRequired,
  //   Birthday: PropTypes.instanceOf(Date).isRequired,
  //   FavoriteMovies: PropTypes.array.isRequired
  // }).isRequired,
  // onBackClick: PropTypes.func.isRequired
// };
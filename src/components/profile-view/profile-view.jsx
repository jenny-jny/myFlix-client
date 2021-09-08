import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {MovieCard} from '../movie-card/movie-card';

export function ProfileView(props){
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
    axios.put(`https://jny-myflix.herokuapp.com/users/${props.user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(response => {
      const data = response.data;
      console.log(data);
      localStorage.setItem('user', username);
    }).catch(() => {
      console.log('error updating the user');
    });
  };

  const unregister = () => {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://jny-myflix.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      console.log(response);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert("Your account has been deleted.");
      window.open('/register', '_self');
    });
  };

  return (
    <Container>
      <Row>
        <Col md = {8}>
          <Button onClick = {() => props.onBackClick()}>Back</Button>
        </Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {7}>
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
        <Col md = {1}>
          <Button variant = "secondary" onClick = {unregister}>Unregister</Button>
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
                  <MovieCard favoriteMoviesList = {favoriteMoviesList} movieData = {favoriteMovie} simple = {true} simple2 = {false}/>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.shape({
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
  onBackClick: PropTypes.func.isRequired
};
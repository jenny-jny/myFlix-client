import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export function MovieView(props){
  const {movie, onBackClick} = props;

  const addFavorite = () => {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post(`https://jny-myflix.herokuapp.com/users/${username}/favorites/` + props.movie._id, {}, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then((response) => {
      console.log(response);
      alert(props.movie.Title + " has been added to your favorites!");
    });
  };
  
  return (
    <Container>
      <Button onClick = {() => onBackClick()}>Back</Button>
      <Row className = "movie-view justify-content-md-center">
        <Col md = {8}>
          <div className = "movie-title">
            <div className = "value">{movie.Title}</div>
          </div>
          <Button variant = "success" onClick = {() => addFavorite()}>Add to favorites</Button>
          <div className = "movie-genre">
            <span className = "label">Genre: </span>
            <span className = "value">
              <Link to = {`${movie.Title}/genre/${movie.Genre.Name}`}>
                <Button variant = "link">{movie.Genre.Name}</Button>
              </Link>
            </span>
          </div>
          <div className = "movie-director">
            <span className = "label">Director: </span>
            <span className = "value">
              <Link to = {`${movie.Title}/director/${movie.Director.Name}`}>
                <Button variant = "link">{movie.Director.Name}</Button>
              </Link>
            </span>
          </div>
          <div className = "movie-description">
            <div className = "value">{movie.Description}</div>
          </div>  
        </Col>
      </Row>
      <Row className = "movie-view justify-content-md-center">
        <Col md = {8}>
          <div className = "movie-poster" style={{width: '100%'}}>
            <img src = {movie.ImagePath} width = '100%' height = 'auto'/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
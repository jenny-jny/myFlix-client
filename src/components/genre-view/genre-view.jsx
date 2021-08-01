import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {MovieCard} from '../movie-card/movie-card';

export function GenreView(props){
  return (
    <Container>
      <Button onClick = {() => props.onBackClick()}>Back</Button>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.genre.Name}</Col>
      </Row>
      <Row className = "justify-content-md-center">
        <Col md = {8}>{props.genre.Description}</Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <Row className = "justify-content-md-center">
        <Col md = {8}>
          <Row className = "genre-movies">
            <Col md = {8} className = "label">Some movies that belong to this genre</Col>
            <Row className = "justify-content-md-center">
            {props.moviesData.filter(movie => movie.Genre.Name === props.genre.Name).map(movie => ( 
                  <Col lg = {3} md = {4} sm = {12} key = {movie._id}>
                    <MovieCard movieData = {movie} simple = {true}/>
                  </Col>
                ))}
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
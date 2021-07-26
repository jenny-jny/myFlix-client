import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from '../../../../../../Desktop/CareerFoundry/Full-Stack Immersion/Client-Side Programming & React/3.4 Advanced React/Button';

export class MovieView extends React.Component{
  render(){
    const {movie, onBackClick} = this.props;
    return (
      <Container>
        <Row className = "movie-view justify-content-md-center">
          <Col md = {8}>
            <div className = "movie-poster">
              <img src = {movie.ImagePath}/>
            </div>
            <div className = "movie-title">
              <span className = "label">Title: </span>
              <span className = "value">{movie.Title}</span>
            </div>
            <div className = "movie-description">
              <span className = "label">Description: </span>
              <span className = "value">{movie.Description}</span>
            </div>
            <div className = "movie-genre">
              <span className = "label">Genre: </span>
              <span className = "value">{movie.Genre.Name}</span>
            </div>
            <div className = "movie-director">
              <span className = "label">Director: </span>
              <span className = "value">{movie.Director.Name}</span>
            </div>
            <Button onClick = {() => onBackClick(null)}>Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired, 
    Title: PropTypes.string.isRequired, 
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
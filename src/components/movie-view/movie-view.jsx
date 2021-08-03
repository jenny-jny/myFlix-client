import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class MovieView extends React.Component{
  render(){
    const {movie, onBackClick} = this.props;
    return (
      <Container>
        <Button onClick = {() => onBackClick()}>Back</Button>
        <Row className = "movie-view justify-content-md-center">
          <Col md = {8}>
            <span>
              <div className = "movie-title">
                <div className = "value">{movie.Title}</div>
              </div>
              <div className = "movie-genre">
                {/* <span className = "label">Genre: </span>
                <span className = "value">{movie.Genre.Name}</span> */}
                <Link to = {`${movie.Title}/genre/${movie.Genre.Name}`}>
                  <Button variant = "link">Genre</Button>
                </Link>
              </div>
              <div className = "movie-director">
                {/* <span className = "label">Director: </span>
                <span className = "value">{movie.Director.Name}</span> */}
                <Link to = {`${movie.Title}/director/${movie.Director.Name}`}>
                  <Button variant = "link">Director</Button>
                </Link>
              </div>
              <div className = "movie-description">
                <div className = "value">{movie.Description}</div>
              </div>  
            </span>
            <span>
              <div className = "movie-poster">
                <img src = {movie.ImagePath}/>
              </div>
            </span>
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
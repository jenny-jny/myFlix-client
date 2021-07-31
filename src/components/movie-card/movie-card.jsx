import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class MovieCard extends React.Component{
  render(){
    const {movieData} = this.props;
    return (
      <Card>
        <Card.Img variant = "top" src = {movieData.ImagePath}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to = {`movies/${movieData._id}`}>
            <Button variant = "link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired, 
    Title: PropTypes.string.isRequired, 
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
  // onMovieClick: PropTypes.func.isRequired
};
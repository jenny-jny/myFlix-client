import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class MovieCard extends React.Component{

<<<<<<< Updated upstream
  removeFavorite() {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`http://jny-myflix.herokuapp.com/users/${username}/favorites/` + this.props.movieData._id, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then((response) => {
      console.log(response);
      alert(this.props.movieData.Title + " has been removed from your favorites!");
      window.open(`/users/${username}`, '_self');
    })
  }

  render(){
    const {movieData, simple, simple2} = this.props;
    return (
      <Card>
        <Card.Img variant = "top" src = {movieData.ImagePath}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          {console.log(movieData)}
          {!simple && <Card.Text>{movieData.Description}</Card.Text>}
          <Link to = {`/movies/${movieData._id}`}>
            <Button variant = "link">Open</Button>
          </Link>
          {!simple2 && <Button variant = "link" onClick = {() => this.removeFavorite()}>Remove</Button>}
        </Card.Body>
      </Card>
    );
  }
=======
  // const removeFavorite = () => {
  //   const accessToken = localStorage.getItem('token');
  //   const username = localStorage.getItem('user');
  //   axios.delete(`https://jny-myflix.herokuapp.com/users/${username}/favorites/` + props.movieData._id, {
  //     headers: {Authorization: `Bearer ${accessToken}`}
  //   }).then((response) => {
  //     console.log(response);
  //     alert(props.movieData.Title + " has been removed from your favorites!");
  //     // window.open(`/users/${username}`, '_self');
  //     // props.setFavorites(favoriteMoviesList);
  //   })
  // };

  return (
    <Card>
      <Card.Img variant = "top" src = {movieData.ImagePath}/>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        {!simple && <Card.Text>{movieData.Description}</Card.Text>}
        <Link to = {`/movies/${movieData._id}`}>
          <Button variant = "link">Open</Button>
        </Link>
        {!simple2 && <Button variant = "link" onClick = {() => removeFavorite()}>Remove</Button>}
      </Card.Body>
    </Card>
  );
>>>>>>> Stashed changes
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
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
  }).isRequired
};
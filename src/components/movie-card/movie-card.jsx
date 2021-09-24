import React from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import {setFavorites} from '../../actions/actions';

export function MovieCard(props){
  const {movieData, removeFavoriteFrontEnd, simple, simple2} = props;

  const removeFavoriteBackEnd = () => {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://jny-myflix.herokuapp.com/users/${username}/favorites/` + props.movieData._id, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then((response) => {
      console.log(response);
      alert(props.movieData.Title + " has been removed from your favorites!");
      // window.open(`/users/${username}`, '_self');
      removeFavoriteFrontEnd(props.movieData._id);
    })
  };

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
        {!simple2 && <Button variant = "link" onClick = {() => removeFavoriteBackEnd()}>Remove</Button>}
      </Card.Body>
    </Card>
  );
}

//connect component within application to the store
// export default connect(null, {setFavorites})(MovieCard);

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
  }).isRequired,
  simple: PropTypes.bool.isRequired,
  simple2: PropTypes.bool.isRequired
};
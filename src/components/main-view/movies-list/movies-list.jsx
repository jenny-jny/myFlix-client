import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';

import {MovieCard} from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

function MoviesList(props){
  const {movies, visibilityFilter} = props;
  let filteredMovies = movies;

  if(visibilityFilter !== ''){
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if(!movies) return <div className = "main-view"/>
    return <>
      <Col md = {12} style = {{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter = {visibilityFilter} />
      </Col>
      {/* map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon */}
      {filteredMovies.map(m => {
        return (
          <Col lg = {3} md = {4} sm = {12} key = {m._id}>
            <MovieCard movieData = {m} simple2 = {true}/>
          </Col>
        );
      })}
    </>;
}

const mapStateToProps = state => {
  const {visibilityFilter} = state;
  return {visibilityFilter};
};

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
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
  visibilityFilter: PropTypes.func.isRequired
};
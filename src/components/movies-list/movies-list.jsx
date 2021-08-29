import React from 'react';
import {connect} from 'react-redux';
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
    {filteredMovies.map(m => {
      return (
        <Col md = {3} key = {m._id}>
          <MovieCard movieData = {m}/>
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
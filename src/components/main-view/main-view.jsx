import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor(){ //creates component/class; good place to initialize values
    super(); //calls parent class React.Component
    this.state = { //refers to the MainView class instance created in memory
      movies: [
        {_id: 1, Title: 'Moulin Rouge!', Description: '', imagePath: ''},
        {_id: 2, Title: 'Moulin Rouge!', Description: '', imagePath: ''},
        {_id: 3, Title: 'Moulin Rouge!', Description: '', imagePath: ''}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie){
    this.setState({selectedMovie: newSelectedMovie});
  }

  render(){
    const {movies, selectedMovie} = this.state; //object destruction; equivalent to const movies = this.state.movies;
    if(selectedMovie) return <MovieView movie = {selectedMovie}/>;
    if(movies.length === 0) return <div className = "main-view">The list is empty!</div> //curly braces required only for multiple statements, optional for single statement; else statement omitted
    return (
      <div className = "main-view">
        {/* map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon*/}
        {movies.map(movie => <MovieCard key = {movie._id} movieData = {movie} onMovieClick = {movie => this.setSelectedMovie(movie)}/>)}
      </div>
    );
    
  }
}
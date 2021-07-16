import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor(){ //creates component/class; good place to initialize values
    super(); //calls parent class React.Component
    this.state = { //refers to the MainView class instance created in memory
      movies: [
        {imagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Moulin_rouge_poster.jpg', _id: '60cc06b7ead29eb527ada014', Title: 'Moulin Rouge!', Description: 'Moulin Rouge! is a 2001 jukebox musical romantic drama film. It follows a young English poet, Christian, who falls in love with the star of the Moulin Rouge, cabaret actress and courtesan Satine. The film uses the musical setting of the Montmartre Quarter of Paris and is the final part of Luhrmann\'s \'Red Curtain Trilogy\'', Genre: 'Romance', Director: 'Baz Luhrmann'},
        {imagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c2/TheGreatGatsby2013Poster.jpg', _id: '60cc083eead29eb527ada016', Title: 'The Great Gatsby', Description: 'The Great Gatsby is a 2013 romantic drama film based on F. Scott Fitzgerald\'s 1925 novel. Jay-Z served as executive producer. The film follows the life and times of millionaire Jay Gatsby (DiCaprio) and his neighbor Nick Carraway (Maguire), who recounts his encounter with Gatsby at the height of the Roaring Twenties on Long Island.', Genre: 'Romance', Director: 'Baz Luhrmann'},
        {imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png', _id: '60cc0920ead29eb527ada017', Title: 'Titanic', Description: 'Titanic is a 1997 American epic romance and disaster film. Incorporating both historical and fictionalized aspects, it is based on accounts of the sinking of the RMS Titanic, and stars members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage.', Genre: 'Romance', Director: 'James Cameron'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie){
    this.setState({selectedMovie: newSelectedMovie});
  }

  render(){
    const {movies, selectedMovie} = this.state; //object destruction; equivalent to const movies = this.state.movies;
    if(movies.length === 0) return <div className = "main-view">The list is empty!</div> //curly braces required only for multiple statements, optional for single statement; else statement omitted
    return (
      <div className = "main-view">
        {selectedMovie
          ? <MovieView movie = {selectedMovie} onBackClick = {newSelectedMovie => this.setSelectedMovie(newSelectedMovie)}/>
          //map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results; in arrow function, return single statement does not require semicolon
          : movies.map(movie => <MovieCard key = {movie._id} movieData = {movie} onMovieClick = {movie => this.setSelectedMovie(movie)}/>)
        }
      </div>
    );
    
  }
}
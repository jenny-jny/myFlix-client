import React from 'react';

export class MainView extends React.Component{
  constructor(){ //creates component/class; good place to initialize values
    super(); //calls parent class React.Component
    this.state = { //refers to the MainView class instance created in memory
      movies: [
        {_id: 1, Title: 'Moulin Rouge!', Description: '', imagePath: ''},
        {_id: 2, Title: 'Moulin Rouge!', Description: '', imagePath: ''},
        {_id: 3, Title: 'Moulin Rouge!', Description: '', imagePath: ''}
      ]
    }
  }
  render(){
    const movies = this.state.movies;
    if(movies.length === 0){
      return <div className = "main-view">The list is empty!</div>;
    }else{
      return (
        <div className = "main-view">
          {movies.map((movie) => { //map() loops through an array and calls a defined callback function on each element of an array, and returns an array that contains the results.
            return <div>{movie.Title}</div>;
          })}
        </div>
      );
    }
  }
}
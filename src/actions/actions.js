//action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

//action creators: the value updates the state; naming convention: as close to name of action type as possible for readability
export function setMovies(value){
  //return an object
  return {type: SET_MOVIES, value};
}

export function setFilter(value){
  return {type: SET_FILTER, value};
}
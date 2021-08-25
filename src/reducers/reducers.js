import {combineReducers} from 'redux';
import {SET_MOVIES, SET_FILTER} from '../actions/actions';

//reducer
function visibilityFilter(state = '', action){
  switch(action.type){
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

//reducer
function movies(state = [], action){
  switch(action.type){
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//combined reducer
function moviesApp(state = {}, action){
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action)
  };
}

export default moviesApp;
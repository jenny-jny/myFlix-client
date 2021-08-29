import {SET_MOVIES, SET_FILTER, SET_USER} from '../actions/actions';
import {combineReducers} from 'redux';

//reducer
function movies(state = [], action){
  switch(action.type){
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
}

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
function user(state = [], action){
  switch(action.type){
    case SET_USER:
      return action.value;
    default: 
      return state;
  }
}

//combined reducer
// function moviesApp(state = {}, action){
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   };
// }
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;
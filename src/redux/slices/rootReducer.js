import {combineReducers} from '@reduxjs/toolkit';
import moviesReducer from './movie.slice';
import authReducer from './auth.slice';
const slices = combineReducers({
  moviesReducer,
  authReducer, //reducer de tercero para la barra loader
});

export default slices;

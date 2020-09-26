import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',

  initialState: {
    isFetching: false,
    list: [],
    vaforites: [],
    user: {},
  },

  reducers: {
    requestMovies: (state, action) => {
      state.list = action.payload;
      state.isFetching = false;
    },
    fetchingMovies: (state) => {
      state.isFetching = true;
    },
  },
});

export const {actions, reducer} = movieSlice;

export const {requestMovies, fetchingMovies} = actions;

export const getListMovies = () => async (dispatch) => {
  dispatch(fetchingMovies());

  const response = fetch('http://192.168.0.105:8002/api/movie/list')
    .then((response) => response.json())
    .then((data) => {
      dispatch(requestMovies(data.data));
    })
    .catch((err) => console.log(err, 'eruuuror'));
};

export const fetching = (state) => state.moviesReducer.isFetching;
export const movies = (state) => state.moviesReducer.list;

export default reducer;

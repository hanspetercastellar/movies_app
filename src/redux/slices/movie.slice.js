import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',

  initialState: {
    isFetching: false,
    loadingFavorites: false,
    list: [],
    favorites: [],
    user: {},
    filter: {
      input: null,
      results: null,
    },
  },

  reducers: {
    requestMovies: (state, action) => {
      state.list = [];
      state.list = action.payload;
      state.isFetching = false;
    },
    fetchingMovies: (state) => {
      state.list = [];
      state.isFetching = true;
    },
    requestFavorites: (state, action) => {
      state.favorites = [];
      console.log(action.payload, 'desde el eslice vaforite');
      state.favorites = action.payload;
      state.loadingFavorites = false;
    },
    fetchingFavorites: (state) => {
      state.favorites = [];
      state.loadingFavorites = true;
    },
    setFilterStatus: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {actions, reducer} = movieSlice;

export const {
  requestMovies,
  fetchingMovies,
  requestFavorites,
  fetchingFavorites,
  setFilterStatus,
} = actions;

//thunks
export const getListMovies = () => async (dispatch) => {
  dispatch(fetchingMovies());

  const response = fetch('http://192.168.0.105:8002/api/movie/list')
    .then((response) => response.json())
    .then((data) => {
      dispatch(requestMovies(data.data));
    })
    .catch((err) => console.log(err, 'eruuuror'));
};
export const searchMovies = (input) => async (dispatch) => {
  dispatch(fetchingMovies());

  const response = fetch('http://192.168.0.105:8002/api/movie/search', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({title_movie: input}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (input.length !== 0) {
        const cantidad = data.data.length;
        dispatch(requestMovies(data.data));
        dispatch(setFilterStatus({input: input, results: cantidad}));
      } else {
        dispatch(setFilterStatus({input: null, results: null}));
      }
    })
    .catch((err) => console.log(err, 'eruuuror'));
};
export const getListFavorites = (id_user) => async (dispatch) => {
  dispatch(fetchingFavorites());
  await fetch('http://192.168.0.105:8002/api/movie/favorites/lists', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({id_user}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data, 'data fav');
      dispatch(requestFavorites(data.data[0]));
    })
    .catch((err) => console.log(err, 'eruuuror get sdsListFavorites'));
};

export const fetching = (state) => state.moviesReducer.isFetching;
export const loadingFavorite = (state) => state.moviesReducer.loadingFavorites;
export const favorites = (state) => state.moviesReducer.favorites;
export const movies = (state) => state.moviesReducer.list;
export const filterStatus = (state) => state.moviesReducer.filter;
export default reducer;

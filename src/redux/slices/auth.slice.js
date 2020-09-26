import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',

  initialState: {
    loading: false,
    user: null,
    isLogedIn: false,
    error: {
      status: false,
      message: 'sfsdfsd',
    },
  },

  reducers: {
    requestAuth: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = {
        status: false,
        message: 'sfsdfsd',
      };
      state.isLogedIn = true;
    },
    fetchingAuth: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLogedIn = false;
    },
  },
});

export const {actions, reducer} = movieSlice;

export const {requestAuth, setError, fetchingAuth} = actions;

export const fetching = (state) => state.authReducer.loading;
export const user = (state) => state.authReducer.user;
export const error = (state) => state.authReducer.error;
export const logged = (state) => state.authReducer.isLogedIn;
export default reducer;

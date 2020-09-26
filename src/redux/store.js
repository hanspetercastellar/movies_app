import {configureStore} from '@reduxjs/toolkit';

import slices from './slices/rootReducer';

const store = configureStore({
  reducer: slices,
});

export default store;

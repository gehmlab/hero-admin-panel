import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
};

const store = configureStore({
  reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !=='production',
})


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore( 
//                     combineReducers({heroes, filters}),
//                     composeEnhancers(applyMiddleware(ReduxThunk, stringMiddleware))
//                     );

export default store;


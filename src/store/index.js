import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
};

const store = configureStore({
  reducer: {heroes, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !=='production',
})


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore( 
//                     combineReducers({heroes, filters}),
//                     composeEnhancers(applyMiddleware(ReduxThunk, stringMiddleware))
//                     );

export default store;


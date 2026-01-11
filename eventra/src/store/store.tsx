import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import eventReducer from './reducers/eventSlice';
import userReducer from './reducers/userSlice';
import venueReducer from './reducers/venueSlice';
import postReducer from './reducers/postSlice';
import productReducer from './reducers/productSlice';
import chatReducer from './reducers/chatSlice';

// Combine all slice reducers
const appReducer = combineReducers({
  counter: counterReducer,
  event: eventReducer,
  user: userReducer,
  venue: venueReducer,
  post: postReducer,
  product: productReducer,
  chat: chatReducer,
});

// Reset state on logout
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === 'user/logout') {
    state = undefined; // This clears the entire Redux state
  }

  return appReducer(state, action);
};

// Create store using rootReducer
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

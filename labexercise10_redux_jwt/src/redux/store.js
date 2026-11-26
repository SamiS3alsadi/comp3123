import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import authReducer from './authReducer';

// STORE: holds the whole state of the app
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

// SUBSCRIBE: runs after every dispatch.
// Here it keeps the JWT in localStorage so a refresh does not log you out.
store.subscribe(() => {
  const { token } = store.getState().auth;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
});

export default store;

# Lab Exercise 10 – React Redux + JWT

COMP3123 · Sami Al-Sadi · 101571952

A small React app that shows the main **Redux** concepts with a counter, and **JWT (JSON Web Token)** login with a small Express API.

## How to run

```bash
npm install
npm run server   # terminal 1: JWT API on http://localhost:5050
npm start        # terminal 2: React app on http://localhost:3000
```

Demo login: **sami / password123**

## Redux

Redux keeps the app's data in one place and changes it in a predictable way.

| Concept | What it is | Where in this app |
|---|---|---|
| **State** | The data the app needs (counter value, token, profile) | `initialState` in `src/redux/counterReducer.js` and `authReducer.js` |
| **Store** | The single object that holds all the state | `src/redux/store.js` (`configureStore`) |
| **Reducer** | A function `(state, action) => newState`. It returns a new object and never changes the old one | `counterReducer`, `authReducer` |
| **Action** | A plain object with a `type` that says what happened, e.g. `{ type: 'counter/increment' }` | the action creators `increment()`, `logout()`, … |
| **Dispatch** | Sends an action to the store, which runs the reducers | `dispatch(increment())` in `src/App.js` |
| **Subscribe** | Runs a function every time the state changes | `store.subscribe` in `store.js` (saves the token to localStorage) and in `App.js` (the log on the page) |

`login()` and `fetchProfile()` are async actions (thunks): they call the API first, then dispatch a success or failure action.

## JWT

A JWT is a signed string with three parts: `header.payload.signature`.

1. The user logs in. `POST /api/login` checks the username and password and returns a token signed with a secret key (`jwt.sign`). It expires after 1 hour.
2. The token is saved in the Redux store, and `store.subscribe` copies it to localStorage, so a page refresh keeps you logged in.
3. To call `GET /api/profile`, the app sends `Authorization: Bearer <token>`.
4. The server checks the signature with `jwt.verify`:
   - no token → **401**
   - wrong or changed token → **403**
   - valid token → **200** with the user data

The payload can be read by anyone (the app decodes and shows it), but it cannot be changed without breaking the signature. That's why it must never hold secrets like passwords.

## Files

```
server.js                    Express API: /api/login, /api/profile
src/redux/store.js           store + subscribe
src/redux/counterReducer.js  counter actions and reducer
src/redux/authReducer.js     login/profile actions and reducer
src/App.js                   UI: counter, login, protected route, token, subscribe log
```

## Screenshots

See the submitted screenshots: the counter, the protected route without a token (401), login and the protected route with a token (200), and the decoded token.

const API_URL = 'http://localhost:5050';

// ACTION TYPES
export const LOGIN_REQUEST = 'auth/loginRequest';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';
export const PROFILE_SUCCESS = 'auth/profileSuccess';
export const PROFILE_FAILURE = 'auth/profileFailure';
export const LOGOUT = 'auth/logout';

// ACTIONS
export const logout = () => ({ type: LOGOUT });

// async action: call the API, then dispatch success or failure
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.message });
  }
};

// call the protected route, sending the token in the header
export const fetchProfile = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  try {
    const res = await fetch(`${API_URL}/api/profile`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    dispatch({ type: PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PROFILE_FAILURE, payload: err.message });
  }
};

// STATE (token comes back from localStorage after a page refresh)
const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  profile: null,
};

// REDUCER
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload, profile: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_SUCCESS:
      return { ...state, profile: action.payload, error: null };
    case PROFILE_FAILURE:
      return { ...state, profile: null, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, profile: null, error: null };
    default:
      return state;
  }
}

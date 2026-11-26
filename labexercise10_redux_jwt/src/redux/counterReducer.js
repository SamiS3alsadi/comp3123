// ACTION TYPES
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const RESET = 'counter/reset';

// ACTIONS (action creators return plain objects with a "type")
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });

// STATE (starting value)
const initialState = { value: 0 };

// REDUCER: (state, action) => new state. Never changes the old state.
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

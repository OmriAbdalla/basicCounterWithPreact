import { h } from 'preact';
import { useReducer } from 'preact/hooks';

// Define action types
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';
const SET_AMOUNT = 'set_amount';

// Initial state
const initialState = {
  count: 0,
  incrementAmount: 1,
  history: []
};

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + state.incrementAmount,
        history: [...state.history, { operation: INCREMENT, value: state.incrementAmount }]
      };
    case DECREMENT:
      if (state.count <= 0) return state;
      return {
        ...state,
        count: state.count - state.incrementAmount,
        history: [...state.history, { operation: DECREMENT, value: state.incrementAmount }]
      };
    case RESET:
      return {
        ...state,
        count: 0,
        history: [...state.history, { operation: RESET, value: state.count }]
      };
    case SET_AMOUNT:
      return {
        ...state,
        incrementAmount: parseInt(action.payload) || 1
      };
    default:
      return state;
  }
}

export default function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const { count, incrementAmount, history } = state;

  const handleIncrement = () => dispatch({ type: INCREMENT });
  const handleDecrement = () => dispatch({ type: DECREMENT });
  const handleReset = () => dispatch({ type: RESET });
  const handleAmountChange = (e) =>
    dispatch({ type: SET_AMOUNT, payload: e.target.value });

  return (
    <div class="counter-container">
      <h1>Preact Counter with useReducer</h1>

      <div class="count-display">{count}</div>

      <div class="amount-control">
        <label htmlFor="increment-amount">Increment amount:</label>
        <input
          id="increment-amount"
          type="number"
          min="1"
          max="10"
          value={incrementAmount}
          onChange={handleAmountChange}
        />
      </div>

      <div class="button-group">
        <button onClick={handleDecrement} class="btn" disabled={count === 0}>
          -
        </button>
        <button onClick={handleReset} class="btn reset">
          Reset
        </button>
        <button onClick={handleIncrement} class="btn">
          +
        </button>
      </div>

      <div class="history-section">
        <h3>Action History</h3>
        <ul class="history-list">
          {history.slice(-5).map((action, index) => (
            <li key={index}>
              {action.operation === INCREMENT &&
                `Incremented by ${action.value}`}
              {action.operation === DECREMENT &&
                `Decremented by ${action.value}`}
              {action.operation === RESET &&
                `Reset from ${action.value} to 0`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

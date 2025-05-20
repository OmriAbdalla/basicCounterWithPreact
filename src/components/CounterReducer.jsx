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
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold mb-6">Preact Counter with useReducer</h1>

      <div class="text-5xl font-mono mb-6">{count}</div>

      <div class="mb-6 text-left">
        <label
          htmlFor="increment-amount"
          class="block mb-2 font-semibold text-gray-700"
        >
          Increment amount:
        </label>
        <input
          id="increment-amount"
          type="number"
          min="1"
          max="10"
          value={incrementAmount}
          onChange={handleAmountChange}
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="flex justify-center gap-4 mb-6">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 hover:bg-red-600 transition"
        >
          -
        </button>
        <button
          onClick={handleReset}
          class="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Reset
        </button>
        <button
          onClick={handleIncrement}
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          +
        </button>
      </div>

      <div class="text-left">
        <h3 class="text-xl font-semibold mb-3">Action History</h3>
        <ul class="list-disc list-inside max-h-32 overflow-y-auto text-gray-700">
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

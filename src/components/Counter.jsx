import { h } from 'preact';
import { useState } from 'preact/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => setCount(0); 
return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-semibold mb-3">Preact Counter</h1>
      <div class="box-border m-auto w-32 p-4 text-white border-4 bg-green-500 m4">{count}</div>
      <div>
        <button onClick={decrement} class="bg-transparent hover:bg-green-500 text-green-700 
font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent 
rounded" disabled={count === 0}>-</button>
        <button onClick={reset} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 
border border-green-700 rounded">Reset</button>
        <button onClick={increment} class="bg-transparent hover:bg-green-500 text-green-700 
font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">+</button>
      </div>
    </div>
  );
}
export default Counter;

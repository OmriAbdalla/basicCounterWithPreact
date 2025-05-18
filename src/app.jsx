
import { h } from 'preact';
import { useState } from 'preact/hooks';
import CounterReducer from "./Components/CounterReducer.jsx";
import './app.css';


function App() {
  return (
    <div class="app">
      <CounterReducer />
    </div>
  );
}

export default App;


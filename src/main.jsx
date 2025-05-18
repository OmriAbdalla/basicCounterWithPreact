import { h, render } from 'preact';
import App from './app.jsx';


// Make sure we're targeting the correct element
const appElement = document.getElementById('app');
console.log('App element found:', appElement);

// Render the application
render(<App />, appElement);

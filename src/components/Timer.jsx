import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function Timer() {
  // State for timer count
  const [count, setCount] = useState(0);
  // State to control if timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State to store window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Effect for the timer
  useEffect(() => {
    let timerId = null;
    // Only set up the timer if isRunning is true
    if (isRunning) {
      timerId = setInterval(() => { setCount(prevCount => prevCount + 1); }, 1000);
    }
// Cleanup function to clear the interval when component unmounts
    // or when isRunning changes to false
    return () => {
        if (timerId) {
          clearInterval(timerId);
        }
      };
    }, [isRunning]); // Only re-run this effect when isRunning changes
   
    // Effect to update document title with current count
    useEffect(() => {
      document.title = `Count: ${count}`;
     
      // Cleanup to reset title when component unmounts
      return () => {
        document.title = 'Preact App';
      };
    }, [count]); // Re-run this effect when count changes
  
// Effect to handle window resize
useEffect(() => {
    // Function to update window width in state
    const handleResize = () => { setWindowWidth(window.innerWidth); };
    // Add event listener
    window.addEventListener('resize', handleResize); 
    // Cleanup function to remove event listener
    return () => { window.removeEventListener('resize', handleResize); };
  }, []); 
// Empty dependency array means this effect runs once on mount
  // Handlers for buttons
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setCount(0);};
    return (
        <div className="timer-container">
          <h2>Simple Timer with useEffect</h2>
          <div className="window-width">
            Window Width: {windowWidth}px
          </div>
          <div className="timer-display">
            {count} seconds
          </div>
          <div className="controls">
            <button onClick={handleStart} 
              disabled={isRunning}
              className="start">  Start </button>
                      <button onClick={handleStop} disabled={!isRunning}
          className="stop">  Stop </button>
        <button onClick={handleReset}
          disabled={count === 0 && !isRunning}
          className="reset">  Reset </button>
      </div>
    </div>
  );
}
    
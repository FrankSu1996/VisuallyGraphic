import React from 'react';
import './App.css';
import PathfindingVisualizer
  from './PathfindingVisualizer/PathfindingVisualizer';

function App () {
  return (
    <div className="App">
      <img
        src="https://images.cooltext.com/5368723.png"
        width="524"
        height="90"
        alt="Graph Visualz"
        className="title"
      />
      <PathfindingVisualizer />
    </div>
  );
}

export default App;

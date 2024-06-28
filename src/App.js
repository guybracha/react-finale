// App.js
import React from 'react';
import Homepage from './comps/Homepage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </div>
  );
}

export default App;

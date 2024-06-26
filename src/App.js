// App.js
import React from 'react';
import Homepage from './comps/Homepage';
import { EmployeeProvider } from './context/EmployeeProvider';

function App() {
  return (
    <div className="App">
      <EmployeeProvider>
        <Homepage />
      </EmployeeProvider>
    </div>
  );
}

export default App;

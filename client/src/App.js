import React from 'react';
import './App.css';
import FixedBottomNavigation from '../src/components/Footer';
import Events from '../src/components/Events';

function App() {
  return (
    <div>
      <div className="body main-background-color">
      <Events />
      </div>
      <FixedBottomNavigation/>
    </div>
  );
}

export default App;

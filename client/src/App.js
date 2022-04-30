import React from 'react';
import './App.css';
import FixedBottomNavigation from '../src/components/Footer';
import EventsMobile from '../src/components/Events';

function App() {
  return (
    <div>
      <div className="body main-background-color">
      <EventsMobile />
      </div>
      <FixedBottomNavigation/>
    </div>
  );
}

export default App;

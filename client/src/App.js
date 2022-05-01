import React from 'react';
import './App.css';
import FixedBottomNavigation from '../src/components/Footer';
import EventsMobile from '../src/components/Events';
import Categories from '../src/components/Categories';
import { StoreProvider } from './utils/GlobalState';

function App() {
  return (
    <StoreProvider>
      <div className="body main-background-color">
      <Categories />
      <EventsMobile />
      </div>
      <FixedBottomNavigation/>
    </StoreProvider>
  );
}

export default App;

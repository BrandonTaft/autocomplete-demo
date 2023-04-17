import { useState, useRef, useEffect, useMemo } from 'react';
import Preview from './Preview';
import Numbers from './Numbers';
import Filter from './Filter';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='App-content'>
        <Preview />
        <Filter />
        <Numbers />
      </div>
    </>
  );
}
export default App;

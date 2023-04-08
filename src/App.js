import { useState, useRef, useEffect, useMemo } from 'react';
import Preview from './Preview';
import Numbers from './Numbers';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='content'>
      <Preview />
      <Numbers />
      </div>
    </div>
  );
  }
export default App;

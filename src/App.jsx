import React, { useState } from 'react';
import './App.css';
import Wheather from './Components/Wheather'
const axios = require('axios');

function App() {
  
  return (
    <div className="App">
      <Wheather />
    </div>
  );
}

export default App;

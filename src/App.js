// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Opener from './pages/opener/opener';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Opener />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

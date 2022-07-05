import './css/App.css';
import './css/FloatingActionButton.css';
import './css/leaflet.css';
import Landmarks from './components/Landmarks';

import React, { useRef, useEffect, useState } from "react";

import { Route, Routes, BrowserRouter, HashRouter, Switch } from 'react-router-dom';

import Login from './components/Login';

// Create basic UI and import notes

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route exact path="/landmarks" element={<Landmarks />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      </HashRouter>
  );
}

export default App;


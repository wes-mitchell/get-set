import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import { GetSet }from './GetSet'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // where to mount react 

root.render(
  <StrictMode>
    <Router>
    <GetSet />
    </Router>
  </StrictMode>
);


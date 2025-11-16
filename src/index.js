import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Make sure this is imported
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*
      This <BrowserRouter> component MUST wrap your <App> component.
      It provides the "context" that all your <Link> and <Routes> components
      need to function. The error "as it is null" means this
      context is missing.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


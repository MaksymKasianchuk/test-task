import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MatrixProvider } from "./context/MatrixProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </React.StrictMode>
);
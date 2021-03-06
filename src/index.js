import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './Components/ThemeContext';
import Navbar from './Components/Navbar';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="bg-white dark:bg-teal-500 transition-all">
        <Navbar />
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
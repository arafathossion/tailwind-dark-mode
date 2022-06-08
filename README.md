
## Usage/Examples
 tailwind.config.js
```javascript

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // false or 'media'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

 ThemeContext.js
```javascript
import React from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme);

  const checkTheme = (existing) => {
    const root = window.document.documentElement;
    const isDark = existing === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(existing);

    localStorage.setItem('current-theme', existing);
  };

  if (initialTheme) {
    checkTheme(initialTheme);
  }

  React.useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```
Navbar
```javascript 

import React from 'react';
import Toggle from './Toggle';

const Navbar = () => {
  return (
    <header className="text-gray-700 bg-white dark:bg-cyan-200 body-font ">
      <div className="flex lg:container flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row justify-between">
        <div className="flex">
          {/* <a
            href="javascript.void(0)"
            className="flex items-center w-40 mb-4 font-medium text-gray-900 title-font md:mb-0"
          >
            <img src={logo} alt="tailwind" className="w-9 h-9" />
          </a> */}
          <nav className="flex flex-wrap items-center justify-center ml-4 text-base">
            <a
              href="javascript.void(0)"
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
            >
              Dashboard
            </a>
            <a
              href="javascript.void(0)"
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
            >
              Projects
            </a>
            <a
              href="javascript.void(0)"
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
            >
              Setting
            </a>
            <a
              href="javascript.void(0)"
              className="mr-5 text-sm font-semibold text-gray-700 dark:text-white rounded-xl hover:text-gray-800"
            >
              Account
            </a>
          </nav>
        </div>
        <div>
          <Toggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
```
Toggle
```Javascript 
import React from 'react';
import { ThemeContext } from './ThemeContext';


const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div>
      {theme === 'dark' ? (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-gray-500 dark:text-gray-400 bg-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-gray-500 dark:text-gray-400 bg-white focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toggle;
```
index.js
```Javascript 
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
```

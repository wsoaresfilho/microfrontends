import React from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <div className="App-header">
        { props.name && <h2>{`App: ${props.name}`}</h2> }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a React application!
        </p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
}

export default App;

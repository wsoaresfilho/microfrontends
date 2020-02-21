import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appName = process.env.REACT_APP_NAME;
const canRenderApp = process.env.REACT_APP_BUILD === 'true';

if (canRenderApp) {
    console.log('App built!');
    const renderApp = (element, props) => {
        const { name: bundleName } = props;
        if (bundleName === appName) {
            console.log(`Loading app: ${bundleName}`);
            ReactDOM.render(<App {...props} />, document.getElementById(element));
        }
    }
    
    window[appName] = renderApp;
} else {
    console.log('App started!');
    ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

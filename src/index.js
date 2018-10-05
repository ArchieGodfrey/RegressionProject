//The root of the web-page. React renders the code in "App" by importing it here.

//Import Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

//Import assests and external files
import './index.css';
import App from './App';

//Render the web-page
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

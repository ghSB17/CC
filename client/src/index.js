import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './styles/_base.css';
import './styles/_bootstrap.css';
import './styles/components/Weather/_current-weather-display.css';
import './styles/components/Weather/_daily-weather-display.css';
import './styles/components/Weather/_hourly-weather-display.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

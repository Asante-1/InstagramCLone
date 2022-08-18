
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer, { initialState} from './context/reducer';
import { StateProvider } from './context/StateProvider';
import './styles/app.css'

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>,
    document.getElementById('root'));
 


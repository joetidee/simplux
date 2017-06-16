import { createStore } from '../src/app.js';
import initialState from './initialState.js';
import reducer from './reducer.js';

let store = createStore(reducer, initialState);

export default store;
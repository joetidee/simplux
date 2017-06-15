import { createStore } from '../simplux/simplux.js';
import initialState from './initialState.js';
import reducer from './reducer.js';

let store = createStore(reducer, initialState);

export default store;
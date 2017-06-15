import store from './store.js';
import * as ACTIONS from './actions';
import createUUID from './helpers.js';

class todoList {

    constructor(){

    }

    getTodos(){

    }

    addTodo(text){
        store.dispatch({ type: ACTIONS.ADD_TODO, payload: { text: text, id: createUUID() } });
    }

    removeTodo(id){
        store.dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id } });
    }
}

export default todoList;
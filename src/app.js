const createStore = (reducerFunc, initialState = {}) => {

    if( typeof reducerFunc !== "function" ){
        throw Error("Reducer must be a function!");
    }

    let reducer = reducerFunc;
    let state = initialState;
    let listeners = [];

    function getState() {
        return state;
    }

    function getListeners() {
        return listeners;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function() {
            unsubscribe(listener);
        }
    }

    function unsubscribe(listener) {
        listeners = listeners.filter(fn => fn !== listener);
    }

    function dispatch(action) {
        state = reducer(state, action);
        emit();
        return action;
    }

    function resetState(){
        state = initialState;
    }
    function resetListeners(){
        listeners = [];
    }

    function resetStore(){
        resetState();
        resetListeners();
    }

    function emit(){
        listeners.forEach((listener) => { listener && listener() });
    }

    return {
        dispatch,
        subscribe,
        unsubscribe,
        getState,
        getListeners,
        resetStore,
        resetState,
        resetListeners
    }
};

module.exports = { createStore };
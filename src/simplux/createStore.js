export default function createStore(reducer, preloadedState) {

    let currentReducer = reducer;
    let state = preloadedState;
    let listeners = [];

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    function unsubscribe(listener) {
        listeners = listeners.filter(item => item !== listener);
    }

    function dispatch(action) {
        state = currentReducer(state, action);
        emit();
    }

    function emit(){
        listeners.forEach((listener) => { listener && listener() });
    }

    return {
        dispatch,
        subscribe,
        unsubscribe,
        getState
    }
}
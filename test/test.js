require('babel-register')();
const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const { createStore } = require('../src/app.js');
const reducer = require('./reducer.js');

const initialState = {
    testArray: []
};
const addObj_1 = {
    id: 1,
    text: 'one'
};
const addObj_2 = {
    id: 2,
    text: 'two'
};
const testAction = {type: 'TEST', payload: { foo: 'bar' }};
const fn = function(){
    return "listener triggered!";
};

const store = createStore(reducer, initialState);


describe('Simplux', function(){

    beforeEach(() => {
        store.resetStore();
    });

    describe('getState()', function(){
        it('Returns correct initial state', function(){
            const store = createStore(reducer, { foo: 'bar' });
            let state = store.getState();
            expect(state.foo).to.equal('bar');
        });
    });

    describe('getListeners()', function(){
        it('Gets a registered listener function', function(){
            let unsubscribe = store.subscribe(fn);
            let listeners = store.getListeners();
            expect(listeners).to.be.an('array').that.includes(fn);
        });
    });

    describe('subscribe()', function(){
        it('Subscribes a listener function', function(){
            let unsubscribe = store.subscribe(fn);
            let listeners = store.getListeners();
            expect(listeners).to.be.an('array').that.includes(fn);
        });
    });

    describe('unsubscribe()', function(){
        it('Unsubscribes a listener function', function(){
            let unsubscribe = store.subscribe(fn);
            unsubscribe();
            let listeners = store.getListeners();
            expect(listeners).to.be.an('array').to.not.include(fn);
        });
    });

    describe('dispatch()', function(){
        it('Returns the action object', function(){
            let obj = store.dispatch(testAction);
            expect(obj).to.deep.equal(testAction);
        });
    });

    describe('resetState()', function(){
        it('Resets the store state', function(){
            const store = createStore(reducer, initialState);
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_1 }});
            store.resetState();
            let state = store.getState();
            expect(state).to.deep.equal(initialState);
        });
    });

    describe('resetListeners()', function(){
        it('Resets the listeners array', function(){
            let unsubscribe = store.subscribe(fn);
            store.resetListeners();
            let listeners = store.getListeners();
            expect(listeners).to.be.empty;
        });
    });

    describe('Reducer', function(){
        it('Adds an object to \'testArray\', in the store', function(){
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_1 }});
            let state = store.getState();
            expect(state.testArray[0].id).to.equal(1);
        });
        it('Updates the object in \'testArray\', in the store', function(){
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_1 }});
            store.dispatch({ type: 'UPDATE_OBJECT_IN_ARRAY', payload: { id: 1, text: 'one is update' }});
            let state = store.getState();
            expect(state.testArray[0].text).to.equal('one is update');
        });
        it('Removes the object from \'testArray\', in the store', function(){
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_1 }});
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_2 }});
            store.dispatch({ type: 'REMOVE_OBJECT_FROM_ARRAY', payload: { id: 1 }});
            let state = store.getState();
            expect(state.testArray.length).to.equal(1);
            expect(state.testArray[0].id).to.equal(2);
        });
    });

    describe('Listeners', function(){
        it('State change triggers a listener function', function(){
            let fn = sinon.spy();
            let unsubscribe = store.subscribe(fn);
            store.dispatch({ type: 'ADD_OBJECT_TO_ARRAY', payload: { obj: addObj_1 }});
            expect(fn).to.have.been.calledOnce;
        });
    });
});
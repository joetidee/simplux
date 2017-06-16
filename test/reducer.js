const reducer = (state = {}, action) => {

    if( action.type === 'ADD_OBJECT_TO_ARRAY' ){
        return {
            ...state,
            testArray: [
                ...state.testArray,
                action.payload.obj
            ]
        };
    }
    else if( action.type === 'UPDATE_OBJECT_IN_ARRAY' ){
        return {
            ...state,
            testArray: state.testArray.map((obj) => {
                if(obj.id === action.payload.id){
                    obj.text = action.payload.text;
                }
                return obj;
            })
        };
    }
    else if( action.type === 'REMOVE_OBJECT_FROM_ARRAY' ){
        return {
            ...state,
            testArray: state.testArray.filter(obj => obj.id !== action.payload.id)
        };
    }

    return state;
};

module.exports = reducer;
const redux = require('redux');
const redux_logger = require('redux-logger');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = redux_logger.createLogger();

// Action
const BUY_CAKE = 'BUY_CAKE';
const ICECREAM_CAKE = 'ICECREAM_CAKE';

// Action creator function [create/return an action]
const buy_cake = () => {
    return {
        type: BUY_CAKE,
        info: 'Buy cake action performed'
    }
};

const buy_icecream = () => {
    return {
        type: ICECREAM_CAKE,
        info: 'Buy icecream action performed'
    }
};

// Reducer function     (prevState, action) => return newState;
const initial_state = {
    numOfCake: 10,
    numOfIceCream: 10
}

const cake_initial_state = {
    numOfCake: 10
}

const icecream_initial_state = {
    numOfIceCream: 10
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case BUY_CAKE: return { ...state, numOfCake: state.numOfCake - 1 }
        case ICECREAM_CAKE: return { ...state, numOfIceCream: state.numOfIceCream - 1 };
        default: return { ...state };
    }
};

const cake_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case BUY_CAKE: return { ...state, numOfCake: state.numOfCake - 1 }
        default: return { ...state };
    }
};

const icecream_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case ICECREAM_CAKE: return { ...state, numOfIceCream: state.numOfIceCream - 1 };
        default: return { ...state };
    }
};

// combine reducer
const rootReducer = combineReducers({
    cake: cake_reducer,
    icecream:icecream_reducer
})

// Redudx Store / state container 

const store = createStore(rootReducer,applyMiddleware(logger));
console.log('initial state', store.getState());
const unSubscribe = store.subscribe(() => console.log('Updated state', store.getState()));
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
unSubscribe();
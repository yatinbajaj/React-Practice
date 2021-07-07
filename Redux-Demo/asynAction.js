const redux = require('redux');
const axios = require('axios');
const redux_thunk = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const initial_state = {
    loading: false,
    users: [],
    error:''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILUER = 'FETCH_USER_FAILUER';

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
};

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        paylod: users
    }
};

const fetchUserFailuer = (error) => {
    return {
        type: FETCH_USER_FAILUER,
        paylod: error
    }
};

// async action creator
// thunkMiddelware able to return an function instead of action object
// its not a pure function its have side effects such as async api call. this function dispatch action
// it recieve dispatch method as its argument
// function now perform sideeffects such as async task
const fetchUser = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUserSuccess(users));
            }).catch(error => {
                dispatch(fetchUserFailuer(error));
            });
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, users: action.paylod, error: '' };
        case FETCH_USER_FAILUER:
            return { ...state, loading: false, users: [], error: action.paylod };
    }
};

const store = createStore(reducer, applyMiddleware(redux_thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUser()); // function returned is bind with dispatch
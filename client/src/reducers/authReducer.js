import {SET_CURRENT_USER, USER_LOADING, ENROLL, ADD_BALANCE, GET_BALANCE, GET_PRODUCTS, GET_USER_DATA} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    enrolling: false,
    addingBalance: false,
    gettingBalance: false,
    gettingProducts: false,
    gettingUserData: false
};

export default function (state = initialState, action) {

    console.log("Test 1 authReducer.js");
    console.log(action);

    console.log("Test 2 authReducer.js");
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log("Test login from authReducer.js");
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ENROLL:
            console.log("Test enroll from authReducer.js");
            return {
                ...state,
                enrolling: true
            };
        case ADD_BALANCE:
            console.log("Test addBalance from authReducer.js");
            return {
                ...state,
                addingBalance: true
            };
        case GET_BALANCE:
            console.log("Test getBalance from authReducer.js");
            return {
                ...state,
                gettingBalance: true,
                balance: action.balance
            };
        case GET_PRODUCTS:
            console.log("Test GET_PRODUCTS from authReducer.js");
            return {
                ...state,
                gettingProducts: true,
                products: action.products
            };
        case GET_USER_DATA:
            console.log("Test GET_USER_DATA from authReducer.js");
            return {
                ...state,
                gettingUserData: true,
                balance: action.balance,
                products: action.products
            };
        default:
            return state;
    }

}
